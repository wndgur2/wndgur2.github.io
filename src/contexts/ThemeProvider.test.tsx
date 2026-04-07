import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import useTheme from '@/hooks/useTheme'
import { ThemeProvider } from './ThemeProvider'

function TestThemeToggle() {
  const { isDark, setIsDark } = useTheme()

  return (
    <button onClick={() => setIsDark(!isDark)}>{isDark ? 'dark' : 'light'}</button>
  )
}

describe('ThemeProvider', () => {
  it('persists toggled theme to localStorage', () => {
    localStorage.setItem('theme', 'dark')

    render(
      <ThemeProvider>
        <TestThemeToggle />
      </ThemeProvider>,
    )

    fireEvent.click(screen.getByRole('button'))
    expect(localStorage.getItem('theme')).toBe('light')
  })
})
