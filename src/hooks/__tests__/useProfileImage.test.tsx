import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import useProfileImage from '@/hooks/useProfileImage'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('useProfileImage', () => {
  it('preloads profile images only once', () => {
    let created = 0
    vi.stubGlobal(
      'Image',
      class {
        src = ''
        constructor() {
          created++
        }
      },
    )

    const { rerender } = renderHook(() => useProfileImage())
    const afterMount = created
    expect(afterMount).toBeGreaterThan(0)

    rerender()
    rerender()
    expect(created).toBe(afterMount)
  })
})
