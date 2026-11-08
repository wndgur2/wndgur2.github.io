// @vitest-environment node
import { mkdtemp, readdir } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import sharp from 'sharp'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { fitDimensions, resolveImageSource } from '../images.js'

const { mediaDir } = vi.hoisted(() => ({ mediaDir: { current: '' } }))

vi.mock('../fs.js', () => ({
  get OUT_DIR_MEDIA() {
    return mediaDir.current
  },
}))

const { localizeImages, pruneMirroredImages } = await import('../images.js')

const base = { owner: 'me', repo: 'blog', ref: 'main', dir: 'posts/algo' }
const asset = id => `https://github.com/user-attachments/assets/${id}`

const png = (width, height) =>
  sharp({
    create: { width, height, channels: 3, background: '#123456' },
  })
    .png()
    .toBuffer()

function stubFetch(routes) {
  const fetchMock = vi.fn(async url => {
    const body = routes[url]
    return body
      ? new Response(body)
      : new Response('not found', { status: 404 })
  })
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

beforeEach(async () => {
  mediaDir.current = await mkdtemp(path.join(os.tmpdir(), 'media-'))
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  vi.spyOn(console, 'log').mockImplementation(() => {})
})

describe('resolveImageSource', () => {
  it('marks GitHub attachments as immutable', () => {
    expect(resolveImageSource(asset('abc'), base)).toEqual({
      url: asset('abc'),
      immutable: true,
    })
  })

  it('leaves third-party, absolute and data images alone', () => {
    for (const src of [
      'https://upload.acmicpc.net/x/-/preview/',
      '/images/a.png',
      '//cdn.example.com/a.png',
      'data:image/png;base64,AAAA',
    ]) {
      expect(resolveImageSource(src, base)).toBeNull()
    }
  })

  it('resolves relative paths against the markdown file', () => {
    expect(resolveImageSource('./images/a%20b.png?raw=1', base)?.url).toBe(
      'https://raw.githubusercontent.com/me/blog/main/posts/algo/images/a%20b.png',
    )
    expect(resolveImageSource('../c.png', base)?.url).toBe(
      'https://raw.githubusercontent.com/me/blog/main/posts/c.png',
    )
  })

  it('refuses paths that leave the repository', () => {
    expect(resolveImageSource('../../../secret.png', base)).toBeNull()
  })
})

describe('fitDimensions', () => {
  const natural = { width: 1000, height: 500 }

  it('uses the natural size when nothing is specified', () => {
    expect(fitDimensions(undefined, undefined, natural)).toEqual(natural)
  })

  it('keeps the authored width and derives the height', () => {
    expect(fitDimensions('566', undefined, natural)).toEqual({
      width: 566,
      height: 283,
    })
  })

  it('does not touch percentages or fully specified sizes', () => {
    expect(fitDimensions('50%', undefined, natural)).toBeNull()
    expect(fitDimensions('10', '10', natural)).toBeNull()
  })
})

describe('localizeImages', () => {
  it('rewrites html images and fills in the missing height', async () => {
    stubFetch({ [asset('html')]: await png(1000, 500) })

    const result = await localizeImages(
      `<img width="566" alt="칸" src="${asset('html')}">`,
    )

    expect(result).toMatch(
      /^<img height="283" width="566" alt="칸" src="\/media\/[0-9a-f]{16}\.webp">$/,
    )
  })

  it('rewrites markdown images into sized html images', async () => {
    stubFetch({ [asset('md')]: await png(200, 100) })

    const result = await localizeImages(`![그림 "1"](${asset('md')})`)

    expect(result).toMatch(
      /^<img alt="그림 &quot;1&quot;" src="\/media\/[0-9a-f]{16}\.webp" width="200" height="100" \/>$/,
    )
  })

  it('downloads relative images from the repository', async () => {
    const url =
      'https://raw.githubusercontent.com/me/blog/main/posts/algo/images/a.png'
    stubFetch({ [url]: await png(10, 10) })

    const result = await localizeImages('<img src="images/a.png">', { base })

    expect(result).toContain('/media/')
  })

  it('caps very wide images', async () => {
    stubFetch({ [asset('wide')]: await png(3200, 800) })

    const result = await localizeImages(`![](${asset('wide')})`)

    expect(result).toContain('width="1600" height="400"')
  })

  it('keeps the original url when the download fails', async () => {
    stubFetch({})
    const markdown = `<img src="${asset('gone')}">`

    await expect(localizeImages(markdown)).resolves.toBe(markdown)
  })

  it('does not touch third-party images or code samples', async () => {
    const fetchMock = stubFetch({})
    const markdown = [
      '<img src="https://upload.acmicpc.net/x/-/preview/">',
      '```html',
      `<img src="${asset('code')}">`,
      '<img src="">',
      '```',
      `\`![](${asset('inline')})\``,
    ].join('\n')

    await expect(localizeImages(markdown)).resolves.toBe(markdown)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('replaces empty images with a link to the problem', async () => {
    stubFetch({})

    const result = await localizeImages('앞 <img alt="" src="" style="a"> 뒤', {
      missingImageLink: 'https://www.acmicpc.net/problem/21611',
    })

    expect(result).toBe(
      '앞 <a href="https://www.acmicpc.net/problem/21611" target="_blank" rel="noopener noreferrer">원문 문제 보기</a> 뒤',
    )
  })

  it('removes empty images when there is no link', async () => {
    await expect(localizeImages('<img src="">')).resolves.toBe('')
  })

  it('keeps animation frames and reports the size of one frame', async () => {
    const frames = Buffer.alloc(40 * 60 * 3, 200)
    frames.fill(10, 0, 40 * 20 * 3)
    const gif = await sharp(frames, {
      raw: { width: 40, height: 60, channels: 3, pageHeight: 20 },
    })
      .gif()
      .toBuffer()
    stubFetch({ [asset('gif')]: gif })

    const result = await localizeImages(`![](${asset('gif')})`)

    expect(result).toContain('width="40" height="20"')
    const [file] = await readdir(mediaDir.current)
    const meta = await sharp(path.join(mediaDir.current, file), {
      animated: true,
    }).metadata()
    expect(meta.pages).toBeGreaterThan(1)
  })
})

describe('pruneMirroredImages', () => {
  it('removes files that this build did not use', async () => {
    await sharp({
      create: { width: 1, height: 1, channels: 3, background: '#000' },
    })
      .webp()
      .toFile(path.join(mediaDir.current, 'stale.webp'))

    await pruneMirroredImages()

    await expect(readdir(mediaDir.current)).resolves.toEqual([])
  })
})
