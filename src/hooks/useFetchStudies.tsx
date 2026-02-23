import { useMemo } from 'react'
import { useQueries } from '@tanstack/react-query'

import { useRepoContents } from '@/api/post'
import { type IPost } from '@/types'

export default function useFetchStudies() {
  const { data: studyContents } = useRepoContents('dev-log', 'posts/study')

  const queries = useQueries({
    queries: (studyContents ?? []).map(content => ({
      queryKey: ['study-readme', content.download_url],
      queryFn: async () => {
        const res = await fetch(content.download_url)
        if (!res.ok) {
          throw new Error(`Failed to fetch README for ${content.name}`)
        }

        return res.text()
      },
      enabled: !!studyContents,
    })),
  })

  const studies: IPost[] = useMemo(() => {
    if (!studyContents) return []

    return studyContents.map((content, index) => {
      return {
        id: content.download_url,
        title: content.name.replace('.md', ''),
        category: 'STUDY',
        description: '',
        date_started: new Date().toISOString(),
        date_finished: new Date().toISOString(),
        tags: [],
        github: content.download_url,
        contentUrl: content.download_url,
        thumbnail: '',
        content: queries[index]?.data ?? 'README not found.',
      }
    })
  }, [queries])

  const isLoading = queries.some(q => q.isLoading)
  const isError = queries.some(q => q.isError)

  return {
    studies,
    isLoading,
    isError,
  }
}
