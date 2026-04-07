import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import SearchBar from '@/components/layout/SearchBar'

describe('SearchBar', () => {
  it('prefills input from URL search param', () => {
    const router = createMemoryRouter(
      [{ path: '/search/:searchKey', element: <SearchBar /> }],
      { initialEntries: ['/search/react%20query'] },
    )

    render(<RouterProvider router={router} />)

    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.value).toBe('react query')
  })

  it('navigates to search route on submit', () => {
    const router = createMemoryRouter(
      [
        { path: '/', element: <SearchBar /> },
        { path: '/search/:searchKey', element: <div>Result page</div> },
      ],
      { initialEntries: ['/'] },
    )

    render(<RouterProvider router={router} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'zustand' } })
    fireEvent.submit(input.closest('form') as HTMLFormElement)

    expect(screen.getByText('Result page')).toBeTruthy()
  })
})
