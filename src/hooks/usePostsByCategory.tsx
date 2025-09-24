import { useMemo } from 'react'

import { type IPost } from '../types'

const usePostsByCategory = (posts: IPost[]) => {
  const postsByCategory = useMemo(() => {
    const _postsByCategory: any = {}
    posts.forEach(post => {
      if (!_postsByCategory[post.category]) _postsByCategory[post.category] = []
      else if (_postsByCategory[post.category].length >= 7) return
      _postsByCategory[post.category].push(post)
    })
    return _postsByCategory
  }, [posts])

  return postsByCategory
}

export default usePostsByCategory
