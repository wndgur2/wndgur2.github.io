import { type IPost } from '@/types'

export const getTagsWithCounts = (
  posts: IPost[],
): { tag: string; count: number }[] => {
  const tagCounts = new Map<string, number>()
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1)
    })
  })
  return Array.from(tagCounts, ([tag, count]) => ({ tag, count })).sort(
    (a, b) => b.count - a.count,
  )
}
