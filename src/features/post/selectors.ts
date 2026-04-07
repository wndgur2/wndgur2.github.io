import type CATEGORIES from '@/consts/CATEGORIES'
import type { IPost, PostSortAttributeTypes } from '@/types'

export function searchPosts(posts: IPost[], searchKey: string): IPost[] {
  if (!searchKey) return []

  const words = searchKey.toLowerCase().split(' ')

  return posts.filter(post => {
    const title = post.title.toLowerCase()
    const content = post.content.toLowerCase()
    const tags = post.tags.map(tag => tag.toLowerCase())
    const category = post.category.toLowerCase()

    return words.every(word => {
      if (!word) return true

      switch (word.charAt(0)) {
        case '#':
          return tags.includes(word.slice(1))
        case '@':
          return category === word.slice(1)
        default:
          return title.includes(word) || content.includes(word)
      }
    })
  })
}

export function sortPosts(
  posts: IPost[],
  sortAttribute: PostSortAttributeTypes,
  sortOrder: 'asc' | 'desc',
): IPost[] {
  return [...posts].sort((a, b) =>
    sortOrder === 'desc'
      ? a[sortAttribute] < b[sortAttribute]
        ? 1
        : -1
      : a[sortAttribute] > b[sortAttribute]
        ? 1
        : -1,
  )
}

export function getPostsByCategory(
  posts: IPost[],
  category: (typeof CATEGORIES)[keyof typeof CATEGORIES],
  limit?: number,
): IPost[] {
  const filtered = posts.filter(p => p.category === category)
  return limit ? filtered.slice(0, limit) : filtered
}

export function getTagCounts(posts: IPost[]): { tag: string; count: number }[] {
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
