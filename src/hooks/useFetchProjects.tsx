import { useEffect } from 'react'

import { CATEGORIES, type IProject, type IRepository } from '@/types'

export default function useFetchProjects(
  repositories: IRepository[] | undefined,
  setProjects: React.Dispatch<React.SetStateAction<IProject[]>>,
) {
  useEffect(() => {
    if (!repositories) return

    const promises: Promise<IProject>[] = []

    for (let i = 0; i < repositories.length; i++) {
      const repo = repositories[i]
      const meta = {
        id: repo.id,
        title: repo.name,
        category: CATEGORIES.PROJECT,
        description: repo.description || '',
        date_started: repo.created_at,
        date_finished: repo.updated_at,
        tags: repo.topics,
        github: repo.html_url,
        contentUrl: `https://raw.githubusercontent.com/wndgur2/${repo.name}/${repo.default_branch}/README.md`,
        thumbnail: '',
      }
      promises.push(
        new Promise(async resolve => {
          try {
            const response = await fetch(meta.contentUrl)
            if (!response.ok) {
              throw new Error(`Failed to fetch README for ${meta.title}`)
            }
            const content = await response.text()
            resolve({ ...meta, content })
          } catch (error) {
            console.error(error)
            resolve({ ...meta, content: 'README not found.' })
          }
        }),
      )
    }

    // Fetch README content for each project
    Promise.all(promises).then(projectsWithContent => {
      setProjects(projectsWithContent)
    })
  }, [repositories])
}
