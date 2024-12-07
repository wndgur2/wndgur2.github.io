import { useEffect } from 'react'
import fetchPosts from '@/services/fetchPosts'
import fetchProjects from '@/services/fetchProjects'
import { useSetRecoilState } from 'recoil'
import { postsAtom } from '@/recoil/atoms/postsAtom'


function usePosts () {
  const setPosts = useSetRecoilState(postsAtom);

  useEffect(() => {
    console.log("fetching post")
    fetchPosts(setPosts)
    fetchProjects(setPosts)
  }, [setPosts])
}

export default usePosts
