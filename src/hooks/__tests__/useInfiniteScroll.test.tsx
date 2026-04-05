import { act, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import useInfiniteScroll from '../useInfiniteScroll'

interface HookHarnessProps {
  items: number[]
  deps: unknown[]
}

let lastObserverCallback:
  | ((_entries: IntersectionObserverEntry[]) => void)
  | null

class MockIntersectionObserver {
  constructor(callback: (_entries: IntersectionObserverEntry[]) => void) {
    lastObserverCallback = callback
  }

  observe = vi.fn()
  disconnect = vi.fn()
}

function HookHarness({ items, deps }: HookHarnessProps) {
  const { loadedItems, observerRef, hasMore, isLoading } = useInfiniteScroll({
    items,
    pageSize: 10,
    deps,
  })

  return (
    <>
      <div data-testid='visible-count'>{loadedItems.length}</div>
      <div data-testid='has-more'>{String(hasMore)}</div>
      <div data-testid='is-loading'>{String(isLoading)}</div>
      <div ref={observerRef} data-testid='trigger' />
    </>
  )
}

describe('useInfiniteScroll', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
    lastObserverCallback = null

    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
  })

  it('loads more items when trigger intersects', () => {
    const items = Array.from({ length: 15 }, (_, i) => i)

    render(<HookHarness items={items} deps={['search-a', 'desc']} />)

    expect(screen.getByTestId('visible-count').textContent).toBe('10')
    expect(screen.getByTestId('has-more').textContent).toBe('true')

    act(() => {
      lastObserverCallback?.([
        { isIntersecting: true } as IntersectionObserverEntry,
      ])
      vi.advanceTimersByTime(300)
    })

    expect(screen.getByTestId('visible-count').textContent).toBe('15')
    expect(screen.getByTestId('has-more').textContent).toBe('false')
  })

  it('resets visible count when dependency inputs change', () => {
    const items = Array.from({ length: 18 }, (_, i) => i)

    const { rerender } = render(
      <HookHarness items={items} deps={['search-a', 'desc']} />,
    )

    act(() => {
      lastObserverCallback?.([
        { isIntersecting: true } as IntersectionObserverEntry,
      ])
      vi.advanceTimersByTime(300)
    })

    expect(screen.getByTestId('visible-count').textContent).toBe('18')

    rerender(<HookHarness items={items} deps={['search-b', 'asc']} />)

    expect(screen.getByTestId('visible-count').textContent).toBe('10')
    expect(screen.getByTestId('has-more').textContent).toBe('true')
  })
})
