import { useMemo } from 'react'

import { type IPost, type TCategory } from '../types'

const usePostsByCategory = (posts: IPost[]) => {
  const postsByCategory = useMemo(() => {
    const _postsByCategory = new Map<TCategory, IPost[]>()
    posts.forEach(post => {
      if (!_postsByCategory.get(post.category))
        _postsByCategory.set(post.category, [])
      else if (_postsByCategory.get(post.category)?.length ?? 0 >= 7) return
      _postsByCategory.get(post.category)?.push(post)
    })
    return _postsByCategory
  }, [posts])

  return postsByCategory
}

export default usePostsByCategory
