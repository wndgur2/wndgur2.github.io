import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import PostListItem from '@/components/post/PostListItem'
import { type IPost } from '@/types'

const post = {
  id: 'post-1',
  title: '제목',
  content: '본문',
  category: 'study',
  tags: ['react', 'css'],
  date_started: '2026.01.01',
} as IPost

function renderCard() {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: (
          <ul>
            <PostListItem post={post} />
          </ul>
        ),
      },
      { path: '/post/:id', element: <div>detail</div> },
      { path: '/search/:searchKey', element: <div>search</div> },
    ],
    { initialEntries: ['/'] },
  )
  const { container } = render(<RouterProvider router={router} />)
  return { router, container }
}

describe('PostListItem', () => {
  it('does not nest links', () => {
    const { container } = renderCard()

    expect(container.querySelectorAll('a').length).toBe(3)
    expect(container.querySelector('a a')).toBeNull()
  })

  it('moves through the title and tags with Tab', async () => {
    const user = userEvent.setup()
    renderCard()

    await user.tab()
    expect(document.activeElement?.textContent).toBe('제목')
    await user.tab()
    expect(document.activeElement?.textContent?.trim()).toBe('react')
    await user.tab()
    expect(document.activeElement?.textContent?.trim()).toBe('css')
  })

  it('opens the post with Enter on the title', async () => {
    const user = userEvent.setup()
    const { router } = renderCard()

    await user.tab()
    await user.keyboard('{Enter}')
    expect(router.state.location.pathname).toBe('/post/post-1')
  })

  it('opens the tag search with Enter on a tag', async () => {
    const user = userEvent.setup()
    const { router } = renderCard()

    await user.tab()
    await user.tab()
    await user.keyboard('{Enter}')
    expect(router.state.location.pathname).toBe('/search/%23react')
  })
})
