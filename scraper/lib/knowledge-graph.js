import { createHash } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { OUT_DIR_META } from './fs.js'

/** LLM 추출 결과 캐시. 커밋해서 CI가 API 호출 없이 그래프를 만들 수 있게 한다. */
export const KG_CACHE_PATH = path.join(
  'scraper',
  'cache',
  'knowledge-graph.json',
)
export const KG_OUT_PATH = path.join(OUT_DIR_META, 'knowledge-graph.json')

/** 그래프에 넣을 콘텐츠. 알고리즘 풀이(algorithms.json)는 수가 많고 태그로 충분해 제외한다. */
export const KG_SOURCES = ['projects.json', 'posts.json']

export const CONCEPT_TYPES = [
  'language',
  'library',
  'tool',
  'concept',
  'algorithm',
  'domain',
]

export const RELATION_TYPES = [
  'is_a',
  'part_of',
  'uses',
  'implements',
  'improves',
  'compares',
  'related_to',
]

/** 같은 개념의 표기 차이(대소문자, 공백, 구두점)를 하나의 키로 모은다. C++, C# 기호는 유지한다. */
export function conceptKey(name) {
  return String(name)
    .normalize('NFC')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}+#]+/gu, '')
}

/**
 * 병합 단계가 정한 별칭을 대표 이름으로 바꾼다.
 * aliases: { [conceptKey(별칭)]: 대표 이름 } — scraper/cache 의 merge.aliases
 */
export function resolveConceptName(name, aliases = {}) {
  return aliases[conceptKey(name)] ?? name
}

/** 추출된 개념 이름을 키별로 하나씩 모은다 (병합 단계의 입력). */
export function collectConcepts(posts, cache) {
  const byKey = new Map()
  for (const post of posts) {
    const fresh = getFreshExtraction(cache, post)
    if (!fresh) continue
    for (const { name, type } of fresh.concepts) {
      const key = conceptKey(name)
      if (!key) continue
      const entry = byKey.get(key) ?? { name, type, count: 0 }
      entry.count += 1
      byKey.set(key, entry)
    }
  }
  return byKey
}

/** 개념 목록이 바뀌었을 때만 다시 병합하도록 쓰는 해시 */
export function vocabularyHash(keys) {
  return createHash('sha256')
    .update([...keys].sort().join('\n'))
    .digest('hex')
    .slice(0, 16)
}

/** 본문이 바뀌었을 때만 다시 추출하도록 쓰는 해시 */
export function postHash(post) {
  return createHash('sha256')
    .update(JSON.stringify([post.title, post.tags, post.content]))
    .digest('hex')
    .slice(0, 16)
}

export async function loadPosts() {
  const lists = await Promise.all(
    KG_SOURCES.map(async file =>
      JSON.parse(await readFile(path.join(OUT_DIR_META, file), 'utf8')),
    ),
  )
  return lists.flat()
}

export async function loadCache() {
  try {
    return JSON.parse(await readFile(KG_CACHE_PATH, 'utf8'))
  } catch {
    return { posts: {} }
  }
}

export async function saveCache(cache) {
  const sorted = Object.fromEntries(
    Object.entries(cache.posts).sort(([a], [b]) => a.localeCompare(b)),
  )
  await writeFile(
    KG_CACHE_PATH,
    `${JSON.stringify({ ...cache, posts: sorted }, null, 2)}\n`,
    'utf8',
  )
}

/** 본문이 그대로인 글의 추출 결과만 돌려준다. */
export function getFreshExtraction(cache, post) {
  const entry = cache.posts[post.id]
  return entry && entry.hash === postHash(post) ? entry : null
}

/** 추출 결과가 없는 글은 태그를 개념으로 써서 그래프에서 빠지지 않게 한다. */
function tagsAsExtraction(post) {
  return {
    summary: post.description ?? '',
    concepts: post.tags.map(tag => ({
      name: tag,
      type: 'concept',
      importance: 2,
    })),
    relations: [],
  }
}

/**
 * 글별 추출 결과를 하나의 그래프로 합친다.
 * - 노드: 글(post) + 개념(concept). 별칭을 대표 이름으로 바꾼 뒤 conceptKey로 병합한다.
 * - 링크: 글→개념(mentions), 개념→개념(relation)
 */
export function buildGraph(posts, cache) {
  const concepts = new Map()
  const links = []
  const relationKeys = new Set()
  const nodes = []
  let extracted = 0
  const aliases = cache.merge?.aliases ?? {}
  const resolve = name => resolveConceptName(name, aliases)

  const ensureConcept = (name, type) => {
    const key = conceptKey(name)
    if (!key) return null
    let concept = concepts.get(key)
    if (!concept) {
      concept = { key, names: new Map(), types: new Map(), posts: new Set() }
      concepts.set(key, concept)
    }
    concept.names.set(name, (concept.names.get(name) ?? 0) + 1)
    concept.types.set(type, (concept.types.get(type) ?? 0) + 1)
    return concept
  }

  for (const post of posts) {
    const fresh = getFreshExtraction(cache, post)
    if (fresh) extracted += 1
    const extraction = fresh ?? tagsAsExtraction(post)
    const postNodeId = `post:${post.id}`

    nodes.push({
      id: postNodeId,
      kind: 'post',
      postId: post.id,
      label: post.title,
      category: post.category,
      date: post.date_started,
      summary: extraction.summary || undefined,
    })

    const linked = new Set()
    for (const { name, type, importance } of extraction.concepts) {
      const concept = ensureConcept(resolve(name), type)
      if (!concept || linked.has(concept.key)) continue
      linked.add(concept.key)
      concept.posts.add(post.id)
      links.push({
        source: postNodeId,
        target: `concept:${concept.key}`,
        kind: 'mentions',
        weight: importance,
      })
    }

    for (const { source, target, relation } of extraction.relations) {
      const a = conceptKey(resolve(source))
      const b = conceptKey(resolve(target))
      if (!a || !b || a === b || !linked.has(a) || !linked.has(b)) continue
      const key = `${a}|${b}|${relation}`
      if (relationKeys.has(key)) continue
      relationKeys.add(key)
      links.push({
        source: `concept:${a}`,
        target: `concept:${b}`,
        kind: 'relation',
        relation,
      })
    }
  }

  const mostCommon = counts =>
    [...counts.entries()].sort((x, y) => y[1] - x[1])[0][0]

  for (const concept of concepts.values()) {
    nodes.push({
      id: `concept:${concept.key}`,
      kind: 'concept',
      label: mostCommon(concept.names),
      type: mostCommon(concept.types),
      count: concept.posts.size,
    })
  }

  return {
    generated_at: new Date().toISOString(),
    stats: {
      posts: posts.length,
      extracted,
      concepts: concepts.size,
    },
    nodes,
    links,
  }
}

export async function writeGraph(graph) {
  await writeFile(KG_OUT_PATH, JSON.stringify(graph), 'utf8')
}

/** 캐시만으로 그래프를 만든다 (API 키 불필요). fetch-content 마지막 단계에서 쓴다. */
export async function buildGraphFromCache() {
  const [posts, cache] = await Promise.all([loadPosts(), loadCache()])
  const graph = buildGraph(posts, cache)
  await writeGraph(graph)
  const { extracted, posts: total, concepts } = graph.stats
  console.log(
    `✅ Knowledge graph: ${total} posts (${extracted} extracted by LLM), ${concepts} concepts`,
  )
  if (extracted < total) {
    console.log(
      `ℹ️  ${total - extracted} posts use tags only. Run \`pnpm graph\` to extract them with Claude.`,
    )
  }
  return graph
}
