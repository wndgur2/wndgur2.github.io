import _Post from '@/types/_Post'
import { useMemo } from 'react'

const useRelatedTags = (posts: _Post[]): string[] => {
  const relatedTags = useMemo(() => {
    const tags = new Set<string>()
    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        tags.add(tag)
      })
    })
    return Array.from(tags)
  }, [posts])

  return relatedTags
}

export default useRelatedTags
