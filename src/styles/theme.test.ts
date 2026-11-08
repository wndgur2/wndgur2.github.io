import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

// vitest는 프로젝트 루트에서 실행된다.
const read = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8')

function tokenValue(css: string, theme: string, name: string) {
  const block = css.match(new RegExp(`\\[data-theme="${theme}"\\]\\s*\\{([^}]*)\\}`))
  const value = block?.[1].match(new RegExp(`${name}:\\s*([^;]+);`))
  return value?.[1].trim().toLowerCase()
}

function firstPaintBackground(html: string, theme: string) {
  const rule = html.match(
    new RegExp(`html\\[data-theme="${theme}"\\]\\)\\s*\\{\\s*background-color:\\s*([^;]+);`),
  )
  return rule?.[1].trim().toLowerCase()
}

describe('first paint background', () => {
  const tokens = read('src/styles/tokens.css')
  const indexHtml = read('index.html')

  it.each(['light', 'dark'])('matches --color-bg in %s theme', theme => {
    const expected = tokenValue(tokens, theme, '--color-bg')
    expect(expected).toBeTruthy()
    expect(firstPaintBackground(indexHtml, theme)).toBe(expected)
  })

  it('has no hardcoded body background', () => {
    expect(indexHtml).not.toMatch(/<body[^>]*style=/)
  })
})
