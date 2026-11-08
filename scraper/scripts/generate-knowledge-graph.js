/**
 * Claude로 글마다 개념/관계를 추출해 지식 그래프를 만든다.
 *
 *   pnpm graph            # 바뀐 글만 추출
 *   pnpm graph --force    # 전부 다시 추출
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
  CONCEPT_TYPES,
  conceptKey,
  getFreshExtraction,
  loadCache,
  loadPosts,
  postHash,
  RELATION_TYPES,
  saveCache,
  writeGraph,
} from '../lib/knowledge-graph.js'

const MODEL = process.env.KG_MODEL ?? 'claude-opus-5-5'
const EFFORT = process.env.KG_EFFORT ?? 'medium'
const CONCURRENCY = Number(process.env.KG_CONCURRENCY ?? 4)
const FORCE = process.argv.includes('--force')

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

async function extract(client, post, vocabulary) {
  const response = await client.beta.messages.create({
    model: MODEL,
    max_tokens: 16000,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    output_config: {
      effort: EFFORT,
      format: { type: 'json_schema', schema: SCHEMA },
    },
    system: SYSTEM,
    messages: [{ role: 'user', content: buildPrompt(post, vocabulary) }],
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

  if (todo.length > 0) {
    const client = new Anthropic()
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
