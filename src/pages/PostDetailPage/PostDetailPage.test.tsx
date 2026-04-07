import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import PostDetailPage from '@/pages/PostDetailPage'

import { usePostDetail } from '@/hooks/usePosts'

vi.mock('@/hooks/usePosts', () => ({
  usePostDetail: vi.fn(),
}))

vi.mock('@/hooks/useResetScroll', () => ({
  default: vi.fn(),
}))

vi.mock('@/components/post/MarkdownView', () => ({
  default: () => <div>markdown</div>,
}))

const mockUsePostDetail = vi.mocked(usePostDetail)

describe('PostDetailPage list navigation', () => {
  it('returns to previous search key when coming from search result', async () => {
    mockUsePostDetail.mockReturnValue({
      postId: 'post-1',
      post: {
        id: 'post-1',
        category: 'project',
        title: 'Post Title',
        tags: [],
        github: '',
        date_started: '2024-01-01',
        date_finished: '2024-01-02',
      } as never,
      prevPost: null,
      nextPost: null,
    })

    const router = createMemoryRouter(
      [
        { path: '/post/:id', element: <PostDetailPage /> },
        { path: '/search/:searchKey', element: <div>Search Result</div> },
      ],
      {
        initialEntries: [
          { pathname: '/post/post-1', state: { fromSearchKey: 'react query' } },
        ],
      },
    )

    render(<RouterProvider router={router} />)

    fireEvent.click(screen.getByText('목록으로'))

    expect(await screen.findByText('Search Result')).toBeTruthy()
    expect(router.state.location.pathname).toBe('/search/react%20query')
  })

  it('falls back to category search when there is no previous search key', async () => {
    mockUsePostDetail.mockReturnValue({
      postId: 'post-2',
      post: {
        id: 'post-2',
        category: 'frontend',
        title: 'Post Title',
        tags: [],
        github: '',
        date_started: '2024-01-01',
        date_finished: '2024-01-02',
      } as never,
      prevPost: null,
      nextPost: null,
    })

    const router = createMemoryRouter(
      [
        { path: '/post/:id', element: <PostDetailPage /> },
        { path: '/search/:searchKey', element: <div>Search Result</div> },
      ],
      { initialEntries: ['/post/post-2'] },
    )

    render(<RouterProvider router={router} />)

    fireEvent.click(screen.getByText('목록으로'))

    expect(await screen.findByText('Search Result')).toBeTruthy()
    expect(router.state.location.pathname).toBe('/search/%40frontend')
  })
})
