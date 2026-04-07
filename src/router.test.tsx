import { render, screen } from '@testing-library/react'
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import NoPage from '@/pages/NoPage'
import { ROUTES } from '@/router'

describe('router integration', () => {
  it('renders 404 page on unknown path', async () => {
    const router = createMemoryRouter(
      [
        {
          path: ROUTES.HOME,
          element: <Outlet />,
          children: [{ path: '*', element: <NoPage /> }],
        },
      ],
      { initialEntries: ['/missing'] },
    )

    render(<RouterProvider router={router} />)
    expect(await screen.findByText(/없는 페이지입니다/)).toBeTruthy()
  })
})
