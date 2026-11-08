import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import Tag from '@/components/common/Tag'

function renderTag(path: string, count?: number) {
  const router = createMemoryRouter(
    [
      { path: '/', element: <Tag tag='react' count={count} /> },
      {
        path: '/search/:searchKey',
        element: <Tag tag='react' count={count} />,
      },
      { path: '/other', element: <div>other</div> },
    ],
    { initialEntries: [path] },
  )
  render(<RouterProvider router={router} />)
  return router
}

describe('Tag', () => {
  it('renders a link to the tag search with its name and count', () => {
    renderTag('/', 3)

    const link = screen.getByRole('link', { name: 'react 3' })
    expect(link.getAttribute('href')).toBe('/search/%23react')
  })

  it('is reachable with Tab and navigates with Enter', async () => {
    const user = userEvent.setup()
    const router = renderTag('/')

    await user.tab()
    expect(document.activeElement).toBe(screen.getByRole('link'))

    await user.keyboard('{Enter}')
    expect(router.state.location.pathname).toBe('/search/%23react')
  })

  it('marks the tag in the current search as current', () => {
    renderTag('/search/%23react')

    expect(screen.getByRole('link').getAttribute('aria-current')).toBe('true')
  })

  it('marks a tag among several search words as current', () => {
    renderTag('/search/%23vue%20%23react')

    expect(screen.getByRole('link').getAttribute('aria-current')).toBe('true')
  })

  it('does not mark other tags as current', () => {
    renderTag('/search/%23vue')

    expect(screen.getByRole('link').getAttribute('aria-current')).toBeNull()
  })
})
