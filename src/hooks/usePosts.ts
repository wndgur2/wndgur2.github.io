import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { getAlgorithms, getPosts, getProjects } from '@/api/post'
import { postsAtom } from '@/recoil'

export default function usePosts() {
  const setPosts = useSetRecoilState(postsAtom)

  useEffect(() => {
    getPosts(setPosts)
    getAlgorithms(setPosts)
    getProjects(setPosts)
  }, [setPosts])
}
