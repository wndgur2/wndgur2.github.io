import _Post from '@/types/_Post'
import { useMemo } from 'react'

const useRelatedTags = (posts: _Post[]): { tag: string; count: number }[] => {
  const relatedTags = useMemo(() => {
    const tagCounts = new Map<string, number>()
    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
      })
    })
    // acending sort by count

    return Array.from(tagCounts, ([tag, count]) => ({ tag, count })).sort(
      (a, b) => b.count - a.count
    )
  }, [posts])

  return relatedTags
}

export default useRelatedTags
