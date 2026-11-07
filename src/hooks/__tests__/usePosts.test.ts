import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useGetAllPosts } from '@/api/post'
import type { IPost } from '@/types'
import { usePostDetail } from '../usePosts'

vi.mock('@/api/post', () => ({
  useGetAllPosts: vi.fn(),
}))

const createPost = (id: string, legacy_id?: string): IPost => ({
  id,
  legacy_id,
  title: id,
  date_started: '2024-01-01',
  category: 'study',
  content: '',
  tags: [],
  github: '',
})

const POSTS = [
  createPost('newer'),
  createPost('web-performance', 'legacy-hash'),
  createPost('older'),
]

vi.mocked(useGetAllPosts).mockReturnValue({ data: POSTS } as never)

describe('usePostDetail', () => {
  it.each(['web-performance', 'web-performance.html', 'legacy-hash'])(
    'finds the post and its neighbors from %s',
    idParam => {
      const { result } = renderHook(() => usePostDetail(idParam))

      expect(result.current.postId).toBe('web-performance')
      expect(result.current.nextPost?.id).toBe('newer')
      expect(result.current.prevPost?.id).toBe('older')
    },
  )

  it.each(['missing', 'missing.html', undefined])(
    'returns no post for %s',
    idParam => {
      const { result } = renderHook(() => usePostDetail(idParam))

      expect(result.current.postId).toBeNull()
      expect(result.current.post).toBeNull()
    },
  )
})
