import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'

import ThemeToggler from '@/components/layout/ThemeToggler'

function Harness() {
  const [isDark, setIsDark] = useState(false)
  return (
    <ThemeToggler isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
  )
}

describe('ThemeToggler', () => {
  it('is a named switch that toggles with the keyboard', async () => {
    const user = userEvent.setup()
    render(<Harness />)

    const toggle = screen.getByRole('switch', { name: '다크 모드' })
    expect((toggle as HTMLInputElement).checked).toBe(false)

    await user.tab()
    expect(document.activeElement).toBe(toggle)

    await user.keyboard(' ')
    expect((toggle as HTMLInputElement).checked).toBe(true)

    await user.keyboard(' ')
    expect((toggle as HTMLInputElement).checked).toBe(false)
  })
})
