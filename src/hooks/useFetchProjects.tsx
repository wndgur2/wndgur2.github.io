import { useMemo } from 'react'
import { useQueries } from '@tanstack/react-query'

import { type IProject, type IRepository } from '@/types'

export default function useFetchProjects(
  repositories: IRepository[] | undefined,
) {
  const queries = useQueries({
    queries: (repositories ?? []).map(repo => ({
      queryKey: ['project-readme', repo.name],
      queryFn: async () => {
        const contentUrl = `https://raw.githubusercontent.com/wndgur2/${repo.name}/${repo.default_branch}/README.md`

        const res = await fetch(contentUrl)
        if (!res.ok) {
          throw new Error(`Failed to fetch README for ${repo.name}`)
        }

        return res.text()
      },
      enabled: !!repositories,
    })),
  })

  const projects: IProject[] = useMemo(() => {
    if (!repositories) return []

    return repositories.map((repo, index) => {
      const query = queries[index]

      return {
        id: repo.id,
        title: repo.name,
        category: 'PROJECT',
        description: repo.description || '',
        date_started: repo.created_at,
        date_finished: repo.updated_at,
        tags: repo.topics,
        github: repo.html_url,
        contentUrl: `https://raw.githubusercontent.com/wndgur2/${repo.name}/${repo.default_branch}/README.md`,
        thumbnail: '',
        content: query?.data ?? 'README not found.',
      }
    })
  }, [repositories, queries])

  const isLoading = queries.some(q => q.isLoading)
  const isError = queries.some(q => q.isError)

  return {
    projects,
    isLoading,
    isError,
  }
}
