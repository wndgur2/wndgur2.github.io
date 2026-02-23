import { createContext, useState } from 'react'

import { useUserRepos } from '@/api/post'
import useFetchProjects from '@/hooks/useFetchProjects'
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
  const [projects, setProjects] = useState<IProject[]>([])
  const [studies, _setStudies] = useState<IPost[]>([])
  const [algorithmSolutions, _setAlgorithmSolutions] = useState<
    IAlgorithmSolution[]
  >([])

  useFetchProjects(repositories, setProjects)
  // useFetchStudies(repositories, setStudies)
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
        isLoading,
        getPostByTitle,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubProvider
