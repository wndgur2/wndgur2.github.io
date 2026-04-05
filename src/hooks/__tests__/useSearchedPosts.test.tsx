import { render, screen, waitFor } from '@testing-library/react'
import {
  createMemoryRouter,
  RouterProvider,
  useLocation,
} from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { StoreState } from '@/store/post'
import { usePostStore } from '@/store/post'
import { useSearchPosts } from '../usePosts'
import useSearchedPosts from '../useSearchedPosts'

vi.mock('@/store/post', () => ({
  usePostStore: vi.fn(),
}))

vi.mock('../usePosts', () => ({
  useSearchPosts: vi.fn(),
}))

const mockUsePostStore = vi.mocked(usePostStore)
const mockUseSearchPosts = vi.mocked(useSearchPosts)

function HookProbe() {
  const location = useLocation()
  const { searchKey, searchedPosts } = useSearchedPosts()

  return (
    <>
      <div data-testid='pathname'>{location.pathname}</div>
      <div data-testid='search-key'>{searchKey}</div>
      <div data-testid='result-count'>{searchedPosts.length}</div>
    </>
  )
}

function createMockStoreState(overrides: Partial<StoreState> = {}): StoreState {
  return {
    searchKey: '',
    sortAttribute: 'date_started',
    sortOrder: 'desc',
    setSearchKey: vi.fn(),
    setSortAttribute: vi.fn(),
    setSortOrder: vi.fn(),
    toggleSortOrder: vi.fn(),
    ...overrides,
  }
}

describe('useSearchedPosts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('uses URL param as the source of truth and syncs store from URL', async () => {
    const setSearchKey = vi.fn()

    mockUsePostStore.mockImplementation(selector =>
      selector(createMockStoreState({ searchKey: 'stored-key', setSearchKey })),
    )

    mockUseSearchPosts.mockImplementation(searchKey =>
      searchKey ? [{ id: 'p1' } as never] : [],
    )

    const router = createMemoryRouter(
      [
        { path: '/search/:searchKey', element: <HookProbe /> },
        { path: '/search/', element: <HookProbe /> },
      ],
      { initialEntries: ['/search/url-key'] },
    )

    render(<RouterProvider router={router} />)

    await waitFor(() => {
      expect(screen.getByTestId('search-key').textContent).toBe('url-key')
      expect(screen.getByTestId('pathname').textContent).toBe('/search/url-key')
      expect(screen.getByTestId('result-count').textContent).toBe('1')
    })

    expect(setSearchKey).toHaveBeenCalledWith('url-key')
    expect(mockUseSearchPosts).toHaveBeenCalledWith('url-key')
  })

  it('redirects to stored key when URL key is missing', async () => {
    const setSearchKey = vi.fn()

    mockUsePostStore.mockImplementation(selector =>
      selector(
        createMockStoreState({ searchKey: 'saved query', setSearchKey }),
      ),
    )

    mockUseSearchPosts.mockImplementation(searchKey =>
      searchKey ? [{ id: 'p1' } as never] : [],
    )

    const router = createMemoryRouter(
      [
        { path: '/search/:searchKey', element: <HookProbe /> },
        { path: '/search/', element: <HookProbe /> },
      ],
      { initialEntries: ['/search/'] },
    )

    render(<RouterProvider router={router} />)

    await waitFor(() => {
      expect(screen.getByTestId('search-key').textContent).toBe('saved query')
      expect(screen.getByTestId('result-count').textContent).toBe('1')
    })

    expect(setSearchKey).toHaveBeenCalledWith('saved query')
    expect(mockUseSearchPosts).toHaveBeenCalledWith('saved query')
  })
})
