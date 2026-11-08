import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import SkipLink from '@/components/common/SkipLink'

describe('SkipLink', () => {
  it('is the first Tab stop and moves focus past the skipped links', async () => {
    const user = userEvent.setup()
    render(
      <>
        <SkipLink targetId='target'>본문으로 건너뛰기</SkipLink>
        <a href='/a'>skipped 1</a>
        <a href='/b'>skipped 2</a>
        <div id='target' tabIndex={-1}>
          <a href='/c'>after</a>
        </div>
      </>,
    )

    await user.tab()
    const skipLink = screen.getByRole('link', { name: '본문으로 건너뛰기' })
    expect(document.activeElement).toBe(skipLink)

    await user.keyboard('{Enter}')
    expect(document.activeElement?.id).toBe('target')

    await user.tab()
    expect(document.activeElement).toBe(screen.getByRole('link', { name: 'after' }))
  })

  it('does not change the URL hash', async () => {
    const user = userEvent.setup()
    render(
      <>
        <SkipLink targetId='target'>건너뛰기</SkipLink>
        <div id='target' tabIndex={-1} />
      </>,
    )

    await user.click(screen.getByRole('link', { name: '건너뛰기' }))
    expect(window.location.hash).toBe('')
  })
})
