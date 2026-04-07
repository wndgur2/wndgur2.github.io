import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { StoreState } from '@/store/post'
// Get the mocked function
import { usePostStore } from '@/store/post'
import type { IPost } from '@/types'
import useSortedPosts from '../useSortedPosts'

// Mock the zustand store
vi.mock('@/store/post', () => ({
  usePostStore: vi.fn(),
}))

const mockUsePostStore = vi.mocked(usePostStore)

describe('useSortedPosts', () => {
  const mockPosts: IPost[] = [
    {
      id: '1',
      title: 'Zebra Post',
      date_started: '2024-03-15',
      category: 'project',
      content: '',
      tags: [],
      github: '',
    },
    {
      id: '2',
      title: 'Alpha Post',
      date_started: '2024-01-10',
      category: 'study',
      content: '',
      tags: [],
      github: '',
    },
    {
      id: '3',
      title: 'Beta Post',
      date_started: '2024-02-20',
      category: 'algorithm',
      content: '',
      tags: [],
      github: '',
    },
  ]

  const createMockStoreState = (
    overrides: Partial<StoreState> = {},
  ): StoreState => ({
    sortAttribute: 'date_started',
    sortOrder: 'desc',
    setSortAttribute: vi.fn(),
    setSortOrder: vi.fn(),
    toggleSortOrder: vi.fn(),
    ...overrides,
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should sort posts by date_started in descending order by default', () => {
    mockUsePostStore.mockImplementation(selector =>
      selector(createMockStoreState()),
    )
    const { result } = renderHook(() => useSortedPosts(mockPosts))
    expect(result.current.sortedPosts[0].id).toBe('1') // Most recent: 2024-03-15
    expect(result.current.sortedPosts[1].id).toBe('3') // Middle: 2024-02-20
    expect(result.current.sortedPosts[2].id).toBe('2') // Oldest: 2024-01-10
  })

  it('should sort posts by date_started in ascending order', () => {
    mockUsePostStore.mockImplementation(selector =>
      selector(createMockStoreState({ sortOrder: 'asc' })),
    )
    const { result } = renderHook(() => useSortedPosts(mockPosts))
    expect(result.current.sortedPosts[0].id).toBe('2') // Oldest: 2024-01-10
    expect(result.current.sortedPosts[1].id).toBe('3') // Middle: 2024-02-20
    expect(result.current.sortedPosts[2].id).toBe('1') // Most recent: 2024-03-15
  })

  it('should sort posts by title in descending order', () => {
    mockUsePostStore.mockImplementation(selector =>
      selector(
        createMockStoreState({ sortAttribute: 'title', sortOrder: 'desc' }),
      ),
    )
    const { result } = renderHook(() => useSortedPosts(mockPosts))
    expect(result.current.sortedPosts[0].id).toBe('1') // Zebra Post
    expect(result.current.sortedPosts[1].id).toBe('3') // Beta Post
    expect(result.current.sortedPosts[2].id).toBe('2') // Alpha Post
  })

  it('should sort posts by title in ascending order', () => {
    mockUsePostStore.mockImplementation(selector =>
      selector(
        createMockStoreState({ sortAttribute: 'title', sortOrder: 'asc' }),
      ),
    )
    const { result } = renderHook(() => useSortedPosts(mockPosts))
    expect(result.current.sortedPosts[0].id).toBe('2') // Alpha Post
    expect(result.current.sortedPosts[1].id).toBe('3') // Beta Post
    expect(result.current.sortedPosts[2].id).toBe('1') // Zebra Post
  })

  it('should return toggleSortOrder function from store', () => {
    const mockToggleSortOrder = vi.fn()
    mockUsePostStore.mockImplementation(selector =>
      selector(createMockStoreState({ toggleSortOrder: mockToggleSortOrder })),
    )
    const { result } = renderHook(() => useSortedPosts(mockPosts))
    expect(result.current.toggleSortOrder).toBe(mockToggleSortOrder)
  })

  it('should handle empty posts array', () => {
    mockUsePostStore.mockImplementation(selector =>
      selector(createMockStoreState()),
    )
    const { result } = renderHook(() => useSortedPosts([]))
    expect(result.current.sortedPosts).toEqual([])
  })

  it('should not mutate original posts array', () => {
    mockUsePostStore.mockImplementation(selector =>
      selector(createMockStoreState()),
    )
    const originalPosts = [...mockPosts]
    const { result } = renderHook(() => useSortedPosts(mockPosts))
    expect(mockPosts).toEqual(originalPosts)
    expect(result.current.sortedPosts).not.toBe(mockPosts)
  })

  it('should update sorted posts when sortAttribute changes', () => {
    // TODO: Test memoization with different sortAttribute
  })

  it('should update sorted posts when sortOrder changes', () => {
    // TODO: Test memoization with different sortOrder
  })
})
