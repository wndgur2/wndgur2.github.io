import { useMemo } from 'react'

import CATEGORIES from '@/consts/CATEGORIES'
import { type IPost } from '../types'

export default function usePostsByCategory(posts: IPost[], limit: number = -1) {
  const postsByCategory = useMemo(() => {
    const categorizedPosts = new Map()

    posts.forEach(post => {
      const category = post.category as keyof typeof CATEGORIES
      if (categorizedPosts.has(category.toLowerCase())) {
        categorizedPosts.get(category.toLowerCase())?.push(post)
      } else {
        categorizedPosts.set(category.toLowerCase(), [post])
      }
    })

    return categorizedPosts
  }, [posts])

  return {
    algorithms: (postsByCategory.get(CATEGORIES.ALGORITHM) || []).slice(
      0,
      limit,
    ),
    studies: (postsByCategory.get(CATEGORIES.STUDY) || []).slice(0, limit),
    projects: (postsByCategory.get(CATEGORIES.PROJECT) || []).slice(0, limit),
  }
}
