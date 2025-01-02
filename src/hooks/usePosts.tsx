import { useEffect } from 'react'
import { getPosts, getProjects } from '@/api/post'
import { useSetRecoilState } from 'recoil'
import { postsAtom } from '@/recoil/atoms/postsAtom'

function usePosts() {
  const setPosts = useSetRecoilState(postsAtom)
  console.log('rendering usePosts')

  useEffect(() => {
    console.log('getting posts')
    getPosts(setPosts)
    getProjects(setPosts)
  }, [setPosts])
}

export default usePosts
