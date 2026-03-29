import { useEffect } from 'react'

import { getAlgorithms, getPosts, getProjects } from '@/api/post'
import { useStore } from '@/store'

export default function usePosts() {
  const setPosts = useStore(state => state.setPosts)

  useEffect(() => {
    getPosts(setPosts)
    getAlgorithms(setPosts)
    getProjects(setPosts)
  }, [setPosts])
}
