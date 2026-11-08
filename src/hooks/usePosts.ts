import { useMemo } from 'react'

import { useGetAllPosts } from '@/api/post'
import type CATEGORIES from '@/consts/CATEGORIES'
import {
  getPostsByCategory,
  getTagCounts,
  searchPosts,
} from '@/features/post/selectors'
import type { IPost } from '@/types'

const matchesPostId = (post: IPost, id: string) =>
  post.id === id || post.legacy_id === id

export function usePost(id: string) {
  const { data: posts } = useGetAllPosts()

  return posts.find(post => matchesPostId(post, id)) ?? null
}

export function useAdjacentPosts(id: string) {
  const { data: posts } = useGetAllPosts()

  const index = posts.findIndex(p => matchesPostId(p, id))

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
  // 정적 페이지 파일 경로(/post/x.html)로 들어와도 같은 글을 찾는다
  const postId = useMemo(() => {
    return idParam?.replace(/\.html$/, '') || ''
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
