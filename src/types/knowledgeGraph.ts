/** scraper/lib/knowledge-graph.js 의 buildGraph 출력 형식 */
export interface KGPostNode {
  id: string
  kind: 'post'
  postId: string
  label: string
  category: string
  date: string
  summary?: string
}

export interface KGConceptNode {
  id: string
  kind: 'concept'
  label: string
  type: string
  count: number
}

export type KGNode = KGPostNode | KGConceptNode

export interface KGLink {
  source: string
  target: string
  kind: 'mentions' | 'relation'
  weight?: number
  relation?: string
}

export interface KnowledgeGraph {
  generated_at: string
  stats: { posts: number; extracted: number; concepts: number }
  nodes: KGNode[]
  links: KGLink[]
}
