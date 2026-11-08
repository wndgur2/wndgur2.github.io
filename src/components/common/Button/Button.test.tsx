import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import Button from '@/components/common/Button'

describe('Button', () => {
  it('defaults to type button so it does not submit a form', async () => {
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault())
    render(
      <form onSubmit={onSubmit}>
        <Button>정렬</Button>
      </form>,
    )

    const button = screen.getByRole('button', { name: '정렬' })
    expect(button.getAttribute('type')).toBe('button')

    await userEvent.setup().click(button)
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits a form with type submit', async () => {
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault())
    render(
      <form onSubmit={onSubmit}>
        <Button type='submit'>검색</Button>
      </form>,
    )

    await userEvent.setup().click(screen.getByRole('button', { name: '검색' }))
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('is reachable with Tab and activates with Enter and Space', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Button onClick={onClick}>정렬</Button>)

    await user.tab()
    expect(document.activeElement).toBe(screen.getByRole('button'))

    await user.keyboard('{Enter}')
    await user.keyboard(' ')
    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it('is skipped by Tab when disabled', async () => {
    const user = userEvent.setup()
    render(<Button disabled>정렬</Button>)

    await user.tab()
    expect(document.activeElement).toBe(document.body)
  })
})
