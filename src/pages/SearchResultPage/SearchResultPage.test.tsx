import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import useSearchedPosts from '@/hooks/useSearchedPosts'
import SearchResultPage from '@/pages/SearchResultPage'
import { type IPost } from '@/types'

vi.mock('@/hooks/useSearchedPosts', () => ({ default: vi.fn() }))
vi.mock('@/hooks/useResetScroll', () => ({ default: vi.fn() }))

const posts = Array.from(
  { length: 12 },
  (_, i) =>
    ({
      id: `post-${i}`,
      title: `제목 ${i}`,
      content: '본문',
      category: 'study',
      tags: [],
      github: '',
      date_started: `2026.01.${String(i + 1).padStart(2, '0')}`,
    }) as IPost,
)

function renderPage(result: IPost[]) {
  vi.mocked(useSearchedPosts).mockReturnValue({
    searchedPosts: result,
    searchKey: 'react',
  })
  const router = createMemoryRouter(
    [{ path: '/search/:searchKey', element: <SearchResultPage /> }],
    { initialEntries: ['/search/react'] },
  )
  return render(<RouterProvider router={router} />)
}

describe('SearchResultPage markup', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe() {}
        disconnect() {}
      },
    )
  })

  it('keeps only li elements directly inside the result list', () => {
    const { container } = renderPage(posts)

    const list = container.querySelector('main > ul') as HTMLUListElement
    expect(list.children.length).toBeGreaterThan(0)
    for (const child of list.children) {
      expect(child.tagName).toBe('LI')
    }
  })

  it('renders the empty message outside of a list', () => {
    const { container } = renderPage([])

    const message = screen.getByText(/검색 결과가 없습니다/)
    expect(message.closest('ul')).toBeNull()
    expect(container.querySelector('ul')).toBeNull()
  })

  it('has no block element inside the sort button', () => {
    renderPage(posts)

    const button = screen.getByRole('button', { name: /최근글순|오랜글순/ })
    expect(button.querySelector('p, div')).toBeNull()
  })
})
