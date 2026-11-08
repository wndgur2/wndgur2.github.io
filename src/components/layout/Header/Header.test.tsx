import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { ThemeProvider } from '@/contexts/ThemeProvider'

// vitest 설정에는 svgr 플러그인이 없어서 로고 컴포넌트를 대신한다.
vi.mock('@/assets/logo.svg?react', () => ({
  default: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}))

function renderLayoutParts() {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: (
          <>
            <Header />
            <Footer />
          </>
        ),
      },
    ],
    { initialEntries: ['/'] },
  )
  render(
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>,
  )
}

describe('Header and Footer accessible names', () => {
  it('names the logo link, search input, and icon links', () => {
    renderLayoutParts()

    expect(screen.getByRole('link', { name: '홈' })).toBeTruthy()
    expect(screen.getByRole('textbox', { name: '검색어' })).toBeTruthy()
    expect(screen.getByRole('button', { name: '검색' })).toBeTruthy()
    expect(screen.getByRole('switch', { name: '다크 모드' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Github' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Email' })).toBeTruthy()

    for (const link of screen.getAllByRole('link')) {
      expect(link.getAttribute('aria-label') || link.textContent).toBeTruthy()
    }
  })

  it('reaches every header control with Tab in order', async () => {
    const user = userEvent.setup()
    renderLayoutParts()

    await user.tab()
    expect(document.activeElement).toBe(screen.getByRole('link', { name: '홈' }))
    await user.tab()
    expect(document.activeElement).toBe(
      screen.getByRole('textbox', { name: '검색어' }),
    )
    await user.tab()
    expect(document.activeElement).toBe(screen.getByRole('button', { name: '검색' }))
    await user.tab()
    expect(document.activeElement).toBe(
      screen.getByRole('switch', { name: '다크 모드' }),
    )
  })
})
