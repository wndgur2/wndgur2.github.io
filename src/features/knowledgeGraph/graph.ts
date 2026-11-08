import {
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from 'd3-force'

import type { KGLink, KGNode, KnowledgeGraph } from '@/types/knowledgeGraph'

export type SimNode = KGNode & SimulationNodeDatum
export type SimLink = Omit<KGLink, 'source' | 'target'> &
  SimulationLinkDatum<SimNode>

export interface GraphFilter {
  minCount: number
  hiddenCategories: ReadonlySet<string>
}

export const nodeRadius = (node: KGNode) =>
  node.kind === 'post' ? 4.5 : 3 + Math.sqrt(node.count) * 1.8

/** force-graph 계열 라이브러리처럼 링크 끝점은 문자열 id 또는 노드 객체다. */
export const endId = (end: SimLink['source']) =>
  typeof end === 'object' ? end.id : String(end)

/**
 * 필터에 맞는 노드/링크만 남긴다.
 * - 노드 객체는 `pool`에서 꺼내 재사용해, 필터를 바꿔도 위치가 유지되게 한다.
 * - 링크는 시뮬레이션이 끝점을 객체로 바꿔 넣으므로 매번 새로 만든다.
 */
export function filterGraph(
  data: KnowledgeGraph,
  pool: Map<string, SimNode>,
  { minCount, hiddenCategories }: GraphFilter,
) {
  const visible = new Set<string>()
  for (const node of data.nodes) {
    if (node.kind === 'post' && !hiddenCategories.has(node.category))
      visible.add(node.id)
    if (node.kind === 'concept' && node.count >= minCount) visible.add(node.id)
  }

  const mentions = data.links.filter(
    l =>
      l.kind === 'mentions' && visible.has(l.source) && visible.has(l.target),
  )
  // 보이는 글과 이어지지 않은 노드는 뺀다.
  const connected = new Set(mentions.flatMap(l => [l.source, l.target]))
  const links: SimLink[] = data.links
    .filter(l => connected.has(l.source) && connected.has(l.target))
    .map(l => ({ ...l }))

  const nodes = data.nodes
    .filter(n => connected.has(n.id))
    .map(n => {
      if (!pool.has(n.id)) pool.set(n.id, { ...n })
      return pool.get(n.id)!
    })

  return { nodes, links }
}

/** 페이지와 홈 미리보기가 같은 모양의 레이아웃을 쓰도록 힘 설정을 공유한다. */
export function createSimulation(nodes: SimNode[], links: SimLink[]) {
  return (
    forceSimulation<SimNode>(nodes)
      .force(
        'link',
        forceLink<SimNode, SimLink>(links)
          .id(d => d.id)
          .distance(l => (l.kind === 'relation' ? 46 : 34)),
      )
      .force(
        'charge',
        forceManyBody<SimNode>()
          .strength(d => (d.kind === 'concept' ? -60 - d.count * 18 : -45))
          .distanceMax(320),
      )
      // 떨어진 섬들이 화면 밖으로 흩어지지 않게 가운데로 살짝 당긴다.
      .force('x', forceX<SimNode>().strength(0.06))
      .force('y', forceY<SimNode>().strength(0.06))
      .force(
        'collide',
        forceCollide<SimNode>(d => nodeRadius(d) + 3),
      )
  )
}

export function getBounds(nodes: SimNode[]) {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const n of nodes) {
    const r = nodeRadius(n)
    minX = Math.min(minX, n.x! - r)
    minY = Math.min(minY, n.y! - r)
    maxX = Math.max(maxX, n.x! + r)
    maxY = Math.max(maxY, n.y! + r)
  }
  return { minX, minY, maxX, maxY }
}
