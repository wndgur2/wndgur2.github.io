import { describe, expect, it } from 'vitest'

import { themeSvg } from '../useThemedSvgSrc'

const svg = `<style>:root{--bg:#fff}@media (prefers-color-scheme: dark){:root{--bg:#111}}</style>`

describe('themeSvg', () => {
  it('turns the dark block on for the dark theme', () => {
    expect(themeSvg(svg, true)).toContain('@media all{:root{--bg:#111}}')
  })

  it('turns the dark block off for the light theme', () => {
    expect(themeSvg(svg, false)).toContain('@media not all{:root{--bg:#111}}')
  })

  it('leaves SVGs without a dark block unchanged', () => {
    const plain = '<svg><rect fill="red"/></svg>'
    expect(themeSvg(plain, true)).toBe(plain)
  })
})
