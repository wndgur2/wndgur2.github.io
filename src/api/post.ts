import { useSuspenseQuery } from '@tanstack/react-query'

import { META_PATHS } from '@/consts/meta'
import { QUERY_KEYS } from '@/consts/query'
import type { IAlgorithm, IPost } from '@/types'
import { fetchJSON } from '@/utils/fetch'

export function useGetAllPosts() {
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.POSTS,
    queryFn: async () => {
      const [projects, posts, algorithms] = await Promise.all([
        fetchJSON<IPost[]>(META_PATHS.PROJECTS),
        fetchJSON<IPost[]>(META_PATHS.POSTS),
        fetchJSON<IAlgorithm[]>(META_PATHS.ALGORITHMS),
      ])

      return [...projects, ...posts, ...algorithms].sort((a, b) => {
        const dateA = new Date(a.date_started).getTime()
        const dateB = new Date(b.date_started).getTime()
        return dateB - dateA
      })
    },
    staleTime: 1000 * 60 * 5,
  })
}
