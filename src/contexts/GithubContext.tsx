import { createContext, useState } from 'react'

import { useUserRepos } from '@/api/post'
import useFetchProjects from '@/hooks/useFetchProjects'
import useFetchStudies from '@/hooks/useFetchStudies'
import {
  type IAlgorithmSolution,
  type IPost,
  type IProject,
  type IStudy,
} from '@/types'

interface IGithubContext {
  projects: IProject[]
  studies: IPost[]
  algorithmSolutions: IAlgorithmSolution[]
  isLoading: boolean
  getPostByTitle: (
    title: string,
  ) => IPost | IProject | IStudy | IAlgorithmSolution | undefined
}

export const GithubContext = createContext<IGithubContext>({
  projects: [],
  studies: [],
  algorithmSolutions: [],
  isLoading: false,
  getPostByTitle: () => undefined,
})

export function GithubProvider({ children }: { children: React.ReactNode }) {
  const { data: repositories, isLoading } = useUserRepos()

  // post states
  const [algorithmSolutions, _setAlgorithmSolutions] = useState<
    IAlgorithmSolution[]
  >([])

  const {
    projects,
    isLoading: isProjectsLoading,
    isError: _isProjectsError,
  } = useFetchProjects(repositories)
  const { studies, isLoading: _isStudiesLoading } = useFetchStudies()
  // useFetchAlgorithmSolutions(repositories, setAlgorithmSolutions)

  function getPostByTitle(title: string) {
    const allPosts = [...projects, ...studies, ...algorithmSolutions]
    return allPosts.find(post => post.title === title)
  }

  return (
    <GithubContext.Provider
      value={{
        projects,
        studies,
        algorithmSolutions,
        isLoading: isLoading || isProjectsLoading,
        getPostByTitle,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubProvider
