import { render, screen, waitFor } from '@testing-library/react'
import {
  createMemoryRouter,
  RouterProvider,
  useLocation,
} from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useSearchPosts } from '../usePosts'
import useSearchedPosts from '../useSearchedPosts'

vi.mock('../usePosts', () => ({
  useSearchPosts: vi.fn(),
}))

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

describe('useSearchedPosts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('uses URL param as the source of truth', async () => {
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

    expect(mockUseSearchPosts).toHaveBeenCalledWith('url-key')
  })

  it('returns empty key when URL key is missing', async () => {
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
      expect(screen.getByTestId('search-key').textContent).toBe('')
      expect(screen.getByTestId('result-count').textContent).toBe('0')
    })

    expect(mockUseSearchPosts).toHaveBeenCalledWith('')
  })
})
