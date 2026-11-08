import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import IconButton from '@/components/common/IconButton'

describe('IconButton', () => {
  it('exposes label as its accessible name', () => {
    render(
      <IconButton label='다음 목록'>
        <svg />
      </IconButton>,
    )

    const button = screen.getByRole('button', { name: '다음 목록' })
    expect(button.getAttribute('aria-label')).toBe('다음 목록')
    expect(button.getAttribute('type')).toBe('button')
  })

  it('uses label instead of the name of its content', () => {
    render(
      <IconButton label='프로필 사진'>
        <img src='/a.jpeg' alt='profile' />
      </IconButton>,
    )

    expect(screen.getByRole('button', { name: '프로필 사진' })).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'profile' })).toBeNull()
  })

  it('submits a form with Enter when type is submit', async () => {
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault())
    const user = userEvent.setup()
    render(
      <form onSubmit={onSubmit}>
        <IconButton type='submit' label='검색'>
          <svg />
        </IconButton>
      </form>,
    )

    await user.tab()
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: '검색' }),
    )

    await user.keyboard('{Enter}')
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('activates with Space', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(
      <IconButton label='다음 목록' onClick={onClick}>
        <svg />
      </IconButton>,
    )

    await user.tab()
    await user.keyboard(' ')
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
