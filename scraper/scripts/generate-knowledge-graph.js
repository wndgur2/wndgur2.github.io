/**
 * Claude로 글마다 개념/관계를 추출해 지식 그래프를 만든다.
 *
 *   pnpm graph              # 바뀐 글만 추출하고, 개념 목록이 바뀌었으면 중복 개념을 다시 병합
 *   pnpm graph --force      # 전부 다시 추출하고 다시 병합
 *   pnpm graph --remerge    # 추출은 그대로 두고 병합만 다시
 *
 * - 입력: public/meta/{projects,posts}.json (먼저 fetch-content.js 실행)
 * - 캐시: scraper/cache/knowledge-graph.json (커밋 대상 — CI는 이 캐시로만 그래프를 만든다)
 * - 출력: public/meta/knowledge-graph.json
 * - 환경변수: ANTHROPIC_API_KEY, KG_MODEL(기본 claude-opus-5-5), KG_EFFORT(기본 medium)
 */
import 'dotenv/config'

import Anthropic from '@anthropic-ai/sdk'
import pLimit from 'p-limit'

import {
  buildGraph,
  collectConcepts,
  CONCEPT_TYPES,
  conceptKey,
  getFreshExtraction,
  loadCache,
  loadPosts,
  postHash,
  RELATION_TYPES,
  saveCache,
  vocabularyHash,
  writeGraph,
} from '../lib/knowledge-graph.js'

const MODEL = process.env.KG_MODEL ?? 'claude-opus-5-5'
const EFFORT = process.env.KG_EFFORT ?? 'medium'
const CONCURRENCY = Number(process.env.KG_CONCURRENCY ?? 4)
const FORCE = process.argv.includes('--force')
const REMERGE = FORCE || process.argv.includes('--remerge')

const SCHEMA = {
  type: 'object',
  properties: {
    summary: { type: 'string' },
    concepts: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          type: { type: 'string', enum: CONCEPT_TYPES },
          importance: { type: 'integer', enum: [1, 2, 3] },
        },
        required: ['name', 'type', 'importance'],
        additionalProperties: false,
      },
    },
    relations: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          source: { type: 'string' },
          target: { type: 'string' },
          relation: { type: 'string', enum: RELATION_TYPES },
        },
        required: ['source', 'target', 'relation'],
        additionalProperties: false,
      },
    },
  },
  required: ['summary', 'concepts', 'relations'],
  additionalProperties: false,
}

const SYSTEM = `You build a knowledge graph of a Korean developer's blog. For one post, extract the concepts it is about and how they relate.

- summary: one Korean sentence (under 80 characters) saying what the post covers.
- concepts: 4-12 concepts the post meaningfully discusses — technologies, CS concepts, algorithms, data structures, tools, problem domains. Skip things only mentioned in passing. importance: 3 = the post's main subject, 2 = discussed in some depth, 1 = supporting.
  - Name each concept with its common canonical name, in English when there is a standard English term ("React", "Event Loop", "Dijkstra's Algorithm", "Priority Queue"), otherwise Korean.
  - When a concept matches one in the existing vocabulary, reuse that exact name so posts connect.
  - type: language | library (frameworks too) | tool (platforms, services, infra) | concept | algorithm (algorithms and data structures) | domain (fields such as "Web Performance", "Operating System").
- relations: up to 8 relations between concepts you listed, using their exact names. Only relations the post supports: is_a, part_of, uses, implements, improves, compares, related_to.`

function buildPrompt(post, vocabulary) {
  return `Existing vocabulary (reuse these names when they fit):
${vocabulary.length ? vocabulary.join(', ') : '(none yet)'}

<post>
title: ${post.title}
category: ${post.category}
tags: ${post.tags.join(', ')}

${post.content}
</post>`
}

/** 구조화 출력(JSON schema)으로 한 번 호출하고 파싱한 결과를 돌려준다. */
async function callJSON(client, { system, user, schema }) {
  const response = await client.beta.messages.create({
    model: MODEL,
    max_tokens: 16000,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    output_config: {
      effort: EFFORT,
      format: { type: 'json_schema', schema },
    },
    system,
    messages: [{ role: 'user', content: user }],
  })

  if (response.stop_reason === 'refusal') {
    throw new Error(`refused (${response.stop_details?.category ?? 'unknown'})`)
  }
  if (response.stop_reason === 'max_tokens') {
    throw new Error('hit max_tokens')
  }

  const text = response.content.findLast(block => block.type === 'text')?.text
  if (!text) throw new Error('no text in response')
  return { ...JSON.parse(text), model: response.model }
}

function extract(client, post, vocabulary) {
  return callJSON(client, {
    system: SYSTEM,
    user: buildPrompt(post, vocabulary),
    schema: SCHEMA,
  })
}

const MERGE_SCHEMA = {
  type: 'object',
  properties: {
    groups: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          canonical: { type: 'string' },
          aliases: { type: 'array', items: { type: 'string' } },
        },
        required: ['canonical', 'aliases'],
        additionalProperties: false,
      },
    },
  },
  required: ['groups'],
  additionalProperties: false,
}

const MERGE_SYSTEM = `You clean up the concept list of a knowledge graph built from a Korean developer's blog. Find concepts that are the same thing under different names and group them.

Merge when two names mean the same concept in this blog:
- spelling or casing variants, with or without a suffix ("Socket.io" / "Socket.IO", "React" / "React.js")
- Korean and English names for the same thing ("스택" / "Stack", "동적 계획법" / "Dynamic Programming")
- abbreviations and full names ("SSE" / "Server-Sent Events", "DP" / "Dynamic Programming")
- near-synonyms used interchangeably here ("LLM Agent" / "AI Agent")

Do not merge:
- a broader and a narrower concept ("Graph" / "BFS", "WebSocket" / "Socket.io", "Database" / "MySQL")
- related but distinct concepts ("Streaming" / "Server-Sent Events", "Retry" / "Error Handling")

For each group, pick as canonical the clearest common name, preferring the standard English term, and copy it exactly from the list. List the other names, copied exactly, as aliases. Only output groups that have at least one alias.`

/**
 * 개념 목록에서 같은 개념의 다른 이름을 묶는다.
 * 결과는 cache.merge = { hash, model, groups, aliases } 로 남기고, buildGraph가 aliases를 적용한다.
 */
async function mergeConcepts(getClient, posts, cache) {
  const concepts = collectConcepts(posts, cache)
  const hash = vocabularyHash(concepts.keys())
  if (!REMERGE && cache.merge?.hash === hash) {
    console.log('🔗 Concept list unchanged, keeping the previous merge')
    return
  }

  const list = [...concepts.values()]
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .map(c => `${c.name} (${c.type}, ${c.count})`)
  console.log(`🔗 Merging duplicates among ${list.length} concepts`)

  const result = await callJSON(getClient(), {
    system: MERGE_SYSTEM,
    user: `Concepts as "name (type, number of posts)":\n${list.join('\n')}`,
    schema: MERGE_SCHEMA,
  })

  // 목록에 없는 이름은 버리고, 별칭 → 대표 이름 표를 만든다.
  const aliases = {}
  const groups = []
  for (const { canonical, aliases: names } of result.groups) {
    const canonicalKey = conceptKey(canonical)
    if (!concepts.has(canonicalKey)) continue
    const valid = names.filter(name => {
      const key = conceptKey(name)
      return concepts.has(key) && key !== canonicalKey
    })
    if (!valid.length) continue
    groups.push({ canonical, aliases: valid })
    for (const name of valid) aliases[conceptKey(name)] = canonical
  }
  // 대표 이름이 다른 묶음의 별칭이면 끝까지 따라가 한 이름으로 모은다.
  for (const key of Object.keys(aliases)) {
    let name = aliases[key]
    for (let i = 0; i < 5 && aliases[conceptKey(name)]; i += 1) {
      name = aliases[conceptKey(name)]
    }
    aliases[key] = name
  }

  cache.merge = { hash, model: result.model, groups, aliases }
  const merged = Object.keys(aliases).length
  console.log(`   ${groups.length} groups, ${merged} names merged`)
  for (const g of groups)
    console.log(`   ${g.canonical} ← ${g.aliases.join(', ')}`)
}

async function main() {
  const [posts, cache] = await Promise.all([loadPosts(), loadCache()])
  const todo = posts.filter(post => FORCE || !getFreshExtraction(cache, post))

  // 이미 추출된 개념 이름을 어휘로 넘겨 글 사이의 표기를 맞춘다.
  const vocabulary = new Map()
  const addVocabulary = concepts => {
    for (const { name } of concepts) {
      const key = conceptKey(name)
      if (key && !vocabulary.has(key)) vocabulary.set(key, name)
    }
  }
  for (const entry of Object.values(cache.posts)) addVocabulary(entry.concepts)

  console.log(
    `🧠 ${posts.length} posts, ${todo.length} to extract with ${MODEL} (effort ${EFFORT})`,
  )

  let client
  const getClient = () => (client ??= new Anthropic())

  if (todo.length > 0) {
    getClient()
    const limit = pLimit(CONCURRENCY)
    let done = 0
    const failures = []
    // 동시에 끝난 요청들이 캐시 파일을 겹쳐 쓰지 않도록 저장을 직렬화한다.
    let saving = Promise.resolve()
    const queueSave = () => (saving = saving.then(() => saveCache(cache)))

    await Promise.all(
      todo.map(post =>
        limit(async () => {
          try {
            const result = await extract(client, post, [...vocabulary.values()])
            addVocabulary(result.concepts)
            cache.posts[post.id] = {
              hash: postHash(post),
              title: post.title,
              ...result,
            }
            // 중간에 실패해도 진행한 만큼은 남긴다.
            await queueSave()
          } catch (err) {
            failures.push(`${post.id}: ${err.message}`)
          } finally {
            done += 1
            console.log(`   ${done}/${todo.length} ${post.title}`)
          }
        }),
      ),
    )

    for (const failure of failures) console.warn(`⚠️  ${failure}`)
  }

  // 삭제된 글의 캐시는 정리한다.
  const ids = new Set(posts.map(post => post.id))
  for (const id of Object.keys(cache.posts)) {
    if (!ids.has(id)) delete cache.posts[id]
  }
  try {
    await mergeConcepts(getClient, posts, cache)
  } catch (err) {
    console.warn(`⚠️  merge failed, keeping the previous merge: ${err.message}`)
  }
  await saveCache(cache)

  const graph = buildGraph(posts, cache)
  await writeGraph(graph)
  console.log(
    `✅ ${graph.stats.concepts} concepts, ${graph.links.length} links → public/meta/knowledge-graph.json`,
  )
  console.log(
    '   Commit scraper/cache/knowledge-graph.json to publish the graph.',
  )
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
