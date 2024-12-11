import { useEffect } from 'react'
import { getPosts, getProjects } from '@/api/post'
import { useSetRecoilState } from 'recoil'
import { postsAtom } from '@/recoil/atoms/postsAtom'


function usePosts () {
  const setPosts = useSetRecoilState(postsAtom);

  useEffect(() => {
    getPosts(setPosts)
    getProjects(setPosts)
  }, [setPosts])
}

export default usePosts