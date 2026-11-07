import { describe, expect, it } from 'vitest'

import { getPostWithId } from '../hash.js'
import { slugify } from '../normalize.js'
import {
  createExcerpt,
  renderHomePage,
  renderPostPage,
  renderRobots,
  renderSitemap,
} from '../static-pages.js'

const TEMPLATE = `<head>
<!-- seo:head:start --><title>home</title><!-- seo:head:end -->
</head><body>
<!-- seo:body:start --><noscript>js</noscript><!-- seo:body:end -->
<div id="root"></div></body>`

const POST = {
  id: '도둑질',
  category: 'algorithm',
  title: 'A & B',
  content: '# 제목\n\n본문 $& 내용\n\n```js\nconst code = 1\n```',
  tags: ['dp'],
  date_started: '2024.03.05',
  github: 'https://github.com/wndgur2/dev-log',
}

describe('slugify', () => {
  it('keeps Korean and joins the rest with hyphens', () => {
    expect(slugify('web_performance')).toBe('web-performance')
    expect(slugify('N과_M_(1)')).toBe('n과-m-1')
    expect(slugify('boj-1234-C++17 (Clang)')).toBe('boj-1234-c-17-clang')
  })

  it('normalizes decomposed Korean filenames', () => {
    expect(slugify('도둑질'.normalize('NFD'))).toBe('도둑질')
  })
})

describe('getPostWithId', () => {
  it('uses the slug as a stable id across content edits', () => {
    const before = getPostWithId({ slug: 'a', title: 'T', content: 'old' })
    const after = getPostWithId({ slug: 'a', title: 'T', content: 'new' })

    expect(before.id).toBe('a')
    expect(after.id).toBe('a')
    expect(before.legacy_id).not.toBe(after.legacy_id)
    expect(before).not.toHaveProperty('slug')
  })
})

describe('createExcerpt', () => {
  it('strips markdown syntax, code blocks and html', () => {
    expect(
      createExcerpt(
        '# 제목\n\n<img src="a" /> ![alt](a.png) [링크](b)\n\n- 항목\n\n```js\ncode\n```',
      ),
    ).toBe('제목 링크 항목')
  })

  it('strips table syntax but keeps hyphenated words', () => {
    expect(createExcerpt('| 항목 | 점수 |\n| --- | --- |\n| Double-ended | 1 |')).toBe(
      '항목 점수 Double-ended 1',
    )
  })

  it('truncates long text', () => {
    expect(createExcerpt('가'.repeat(200), 10)).toBe(`${'가'.repeat(10)}...`)
  })
})

describe('renderPostPage', () => {
  const html = renderPostPage(TEMPLATE, POST, {
    prev: { id: 'prev', title: 'Prev' },
  })

  it('replaces head metadata with escaped post values', () => {
    expect(html).toContain('<title>A &amp; B | 이중혁 블로그</title>')
    expect(html).not.toContain('<title>home</title>')
    expect(html).toContain(
      `rel="canonical" href="https://wndgur2.github.io/post/${encodeURIComponent('도둑질')}"`,
    )
    expect(html).toContain('"datePublished":"2024-03-05"')
  })

  it('renders the body before #root without treating $ as a pattern', () => {
    expect(html).toContain('본문 $&amp; 내용')
    expect(html).toContain('<h1>A &amp; B</h1>')
    expect(html).toContain('href="/post/prev"')
    expect(html.indexOf('id="prerender"')).toBeLessThan(
      html.indexOf('id="root"'),
    )
  })

  it('does not emit scripts written in markdown', () => {
    const page = renderPostPage(
      TEMPLATE,
      { ...POST, content: 'a\n\n<script>alert(1)</script>\n\nb' },
      {},
    )
    expect(page).not.toContain('alert(1)')
  })

  it('escapes script-closing sequences in JSON-LD', () => {
    const page = renderPostPage(
      TEMPLATE,
      { ...POST, title: '</script><b>' },
      {},
    )
    expect(page).not.toContain('</script><b>')
  })

  it('fails when the template has no seo block', () => {
    expect(() => renderPostPage('<html></html>', POST, {})).toThrow(
      'Missing seo:head block',
    )
  })
})

describe('renderHomePage', () => {
  it('lists post links inside noscript and keeps the home head', () => {
    const html = renderHomePage(TEMPLATE, [{ id: 'a', title: 'A' }])

    expect(html).toContain('<title>home</title>')
    expect(html).toContain('<li><a href="/post/a">A</a></li>')
  })
})

describe('renderSitemap', () => {
  it('lists the home page and encoded post urls', () => {
    const xml = renderSitemap([POST])

    expect(xml).toContain('<loc>https://wndgur2.github.io/</loc>')
    expect(xml).toContain(
      `<loc>https://wndgur2.github.io/post/${encodeURIComponent('도둑질')}</loc>`,
    )
  })
})

describe('renderRobots', () => {
  it('points to the sitemap', () => {
    expect(renderRobots()).toContain(
      'Sitemap: https://wndgur2.github.io/sitemap.xml',
    )
  })
})
