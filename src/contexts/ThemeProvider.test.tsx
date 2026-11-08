import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import useTheme from '@/hooks/useTheme'
import { ThemeProvider } from './ThemeProvider'

function TestThemeToggle() {
  const { isDark, setIsDark } = useTheme()

  return (
    <button onClick={() => setIsDark(!isDark)}>{isDark ? 'dark' : 'light'}</button>
  )
}

function mockSystemTheme(initial: 'light' | 'dark') {
  const listeners = new Set<(_e: MediaQueryListEvent) => void>()
  const query = {
    matches: initial === 'dark',
    addEventListener: (_: string, cb: (_e: MediaQueryListEvent) => void) =>
      listeners.add(cb),
    removeEventListener: (_: string, cb: (_e: MediaQueryListEvent) => void) =>
      listeners.delete(cb),
  }
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => query),
  )
  return (theme: 'light' | 'dark') => {
    query.matches = theme === 'dark'
    listeners.forEach(cb => cb({ matches: query.matches } as MediaQueryListEvent))
  }
}

function renderProvider() {
  return render(
    <ThemeProvider>
      <TestThemeToggle />
    </ThemeProvider>,
  )
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    delete document.documentElement.dataset.theme
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('persists toggled theme to localStorage', () => {
    localStorage.setItem('theme', 'dark')
    renderProvider()

    fireEvent.click(screen.getByRole('button'))
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('puts data-theme on the html element', () => {
    localStorage.setItem('theme', 'light')
    renderProvider()
    expect(document.documentElement.dataset.theme).toBe('light')

    fireEvent.click(screen.getByRole('button'))
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  it('follows the system theme until the user picks one', () => {
    const setSystemTheme = mockSystemTheme('dark')
    renderProvider()

    expect(screen.getByRole('button').textContent).toBe('dark')
    expect(localStorage.getItem('theme')).toBeNull()

    act(() => setSystemTheme('light'))
    expect(screen.getByRole('button').textContent).toBe('light')
    expect(document.documentElement.dataset.theme).toBe('light')
  })

  it('prefers the stored theme over the system theme', () => {
    const setSystemTheme = mockSystemTheme('dark')
    localStorage.setItem('theme', 'light')
    renderProvider()
    expect(screen.getByRole('button').textContent).toBe('light')

    act(() => setSystemTheme('dark'))
    expect(screen.getByRole('button').textContent).toBe('light')
  })
})
