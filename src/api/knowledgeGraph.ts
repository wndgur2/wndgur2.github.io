import { useSuspenseQuery } from '@tanstack/react-query'

import { META_PATHS } from '@/consts/meta'
import { QUERY_KEYS } from '@/consts/query'
import type { KnowledgeGraph } from '@/types/knowledgeGraph'
import { fetchJSON } from '@/utils/fetch'

export function useGetKnowledgeGraph() {
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.KNOWLEDGE_GRAPH,
    queryFn: () => fetchJSON<KnowledgeGraph>(META_PATHS.KNOWLEDGE_GRAPH),
    staleTime: 1000 * 60 * 5,
  })
}
