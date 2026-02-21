import { useQuery } from '@tanstack/react-query'

import {
  fetchFileContent,
  fetchRepoContents,
  fetchUserRepos,
} from '../api/queries'

export const useUserRepos = () => {
  return useQuery({
    queryKey: ['githubRepos'],
    queryFn: () => fetchUserRepos(),
  })
}

export const useRepoContents = (repo: string, path: string = '') => {
  return useQuery({
    queryKey: ['repoContents', repo, path],
    queryFn: () => fetchRepoContents(repo, path),
    enabled: !!repo,
  })
}

export const useFileContent = (downloadUrl?: string) => {
  return useQuery({
    queryKey: ['fileContent', downloadUrl],
    queryFn: () => fetchFileContent(downloadUrl!),
    enabled: !!downloadUrl,
  })
}
