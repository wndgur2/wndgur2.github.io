import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

import CategoryListItem from '@/components/post/CategoryListItem'
import { usePostsByCategory } from '@/hooks/usePosts'
import { type IPost } from '@/types'

vi.mock('@/hooks/usePosts', () => ({
  usePostsByCategory: vi.fn(),
}))

const posts = [1, 2, 3].map(
  i =>
    ({
      id: `post-${i}`,
      title: `제목 ${i}`,
      content: '본문',
      category: 'study',
      tags: [],
      github: '',
      date_started: '2026.01.01',
    }) as IPost,
)

function renderCategory() {
  vi.mocked(usePostsByCategory).mockReturnValue(posts)
  const router = createMemoryRouter(
    [{ path: '/', element: <CategoryListItem category='study' /> }],
    { initialEntries: ['/'] },
  )
  const { container } = render(<RouterProvider router={router} />)
  const list = container.querySelector('ul') as HTMLUListElement
  Object.defineProperties(list, {
    clientWidth: { configurable: true, value: 500 },
    scrollWidth: { configurable: true, value: 1500 },
  })
  list.scrollBy = vi.fn()

  const scrollTo = (left: number) => {
    list.scrollLeft = left
    fireEvent.scroll(list)
  }
  return { list, scrollTo }
}

describe('CategoryListItem scroll buttons', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('moves focus to the other button when the focused one becomes disabled', async () => {
    const user = userEvent.setup()
    const { scrollTo } = renderCategory()
    const backward = screen.getByRole('button', { name: 'Studies 이전 목록' })
    const forward = screen.getByRole('button', { name: 'Studies 다음 목록' })

    forward.focus()
    await user.keyboard('{Enter}')
    act(() => scrollTo(1000))

    expect((forward as HTMLButtonElement).disabled).toBe(true)
    expect(document.activeElement).toBe(backward)

    await user.keyboard('{Enter}')
    act(() => scrollTo(0))

    expect((backward as HTMLButtonElement).disabled).toBe(true)
    expect(document.activeElement).toBe(forward)
  })

  it('scrolls without smooth animation when reduced motion is preferred', async () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn((query: string) => ({ matches: query.includes('reduce') })),
    )
    const user = userEvent.setup()
    const { list } = renderCategory()

    await user.click(screen.getByRole('button', { name: 'Studies 다음 목록' }))
    expect(list.scrollBy).toHaveBeenCalledWith({ left: 600, behavior: 'auto' })
  })
})
