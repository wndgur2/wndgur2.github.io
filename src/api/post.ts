import { useSuspenseQuery } from '@tanstack/react-query'

import type { IAlgorithm, IPost } from '@/types'
import { fetchJSON } from '@/utils/fetch'

export function useGetAllPosts() {
  return useSuspenseQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const [projects, posts, algorithms] = await Promise.all([
        fetchJSON<IPost[]>('/meta/projects.json'),
        fetchJSON<IPost[]>('/meta/posts.json'),
        fetchJSON<IAlgorithm[]>('/meta/algorithms.json'),
      ])

      return [...projects, ...posts, ...algorithms]
    },
    staleTime: 1000 * 60 * 5,
  })
}
