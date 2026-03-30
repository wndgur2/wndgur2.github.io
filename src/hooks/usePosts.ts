import { useMemo } from 'react'

import { useGetAllPosts } from '@/api/post'
import type CATEGORIES from '@/consts/CATEGORIES'

export function usePost(id: string) {
  const { data: posts } = useGetAllPosts()

  return posts.find(post => post.id === id) ?? null
}

export function useAdjacentPosts(id: string) {
  const { data: posts } = useGetAllPosts()

  const index = posts.findIndex(p => p.id === id)

  if (index === -1) {
    return { prev: null, next: null }
  }

  return {
    prev: posts[index + 1] ?? null,
    next: posts[index - 1] ?? null,
  }
}

export function useSearchPosts(searchKey: string) {
  const { data: posts } = useGetAllPosts()

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

export function usePostsByCategory(
  category: (typeof CATEGORIES)[keyof typeof CATEGORIES],
  limit?: number,
) {
  const { data: posts } = useGetAllPosts()

  const filtered = posts.filter(p => p.category === category)

  return limit ? filtered.slice(0, limit) : filtered
}

export function usePostDetail(idParam: string | undefined) {
  const postId = useMemo(() => {
    return idParam || ''
  }, [idParam])

  const post = usePost(postId)
  const { prev, next } = useAdjacentPosts(postId)

  return {
    postId: post?.id ?? null,
    post,
    prevPost: prev,
    nextPost: next,
  }
}

export function usePostsTags() {
  const { data: posts } = useGetAllPosts()
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
