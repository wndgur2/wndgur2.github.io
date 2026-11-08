import { act, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import IntersectionObserverWrapper from '@/components/common/IntersectionObserverWrapper'

let notify: (_ratio: number) => void = () => {}

beforeEach(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(cb: IntersectionObserverCallback) {
        notify = ratio =>
          cb(
            [{ intersectionRatio: ratio } as IntersectionObserverEntry],
            this as unknown as IntersectionObserver,
          )
      }
      observe() {}
      disconnect() {}
    },
  )
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('IntersectionObserverWrapper', () => {
  it('adds only the given classes', () => {
    const { container } = render(
      <IntersectionObserverWrapper className='item' visibleClassName='visible'>
        child
      </IntersectionObserverWrapper>,
    )
    const wrapper = container.firstElementChild as HTMLElement
    expect(wrapper.className).toBe('item')

    act(() => notify(1))
    expect(wrapper.className).toBe('item visible')
  })

  it('renders no class text when className is omitted', () => {
    const { container } = render(
      <IntersectionObserverWrapper visibleClassName='visible'>
        child
      </IntersectionObserverWrapper>,
    )
    expect(container.firstElementChild?.className).toBe('')
  })
})
