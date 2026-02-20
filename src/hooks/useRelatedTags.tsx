import { useMemo } from 'react'

import { type IPost, type ITag } from '@/types'

const useRelatedTags = (posts: IPost[]): ITag[] => {
  const relatedTags = useMemo(() => {
    const tagCounts = new Map<string, number>()
    posts.forEach(post => {
      post.tags.forEach(tag => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
      })
    })
    // acending sort by count

    return Array.from(tagCounts, ([label, count]) => ({ label, count })).sort(
      (a, b) => b.count - a.count,
    )
  }, [posts])

  return relatedTags
}

export default useRelatedTags
