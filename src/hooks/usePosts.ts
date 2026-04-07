import { useMemo } from 'react'

import { useGetAllPosts } from '@/api/post'
import type CATEGORIES from '@/consts/CATEGORIES'
import {
  getPostsByCategory,
  getTagCounts,
  searchPosts,
} from '@/features/post/selectors'

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
  return useMemo(() => searchPosts(posts, searchKey), [posts, searchKey])
}

export function usePostsByCategory(
  category: (typeof CATEGORIES)[keyof typeof CATEGORIES],
  limit?: number,
) {
  const { data: posts } = useGetAllPosts()
  return useMemo(
    () => getPostsByCategory(posts, category, limit),
    [posts, category, limit],
  )
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
  return useMemo(() => getTagCounts(posts), [posts])
}
