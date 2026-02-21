import axios from 'axios'

import { githubApi } from './github'

export const fetchUserRepos = async () => {
  const { data } = await githubApi.get(`/users/wndgur2/repos`, {
    params: {
      sort: 'created', // created | updated | pushed | full_name
      per_page: 100, // 최대 100개까지 가져오기
    },
  })

  return data
}

export const fetchRepoContents = async (repo: string, path: string = '') => {
  const { data } = await githubApi.get(
    `/repos/wndgur2/${repo}/contents/${path}`,
  )

  return data
}

export const fetchFileContent = async (downloadUrl: string) => {
  const { data } = await axios.get(downloadUrl)
  return data
}
