/** scraper/lib/knowledge-graph.js 의 buildGraph 출력 형식 */
export interface KGPostNode {
  id: string
  kind: 'post'
  postId: string
  label: string
  category: string
  date: string
  summary?: string
  /** 같은 이름의 개념을 흡수한 글이면, 이 글을 언급한 다른 글 수 */
  count?: number
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
