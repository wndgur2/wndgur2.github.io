import crypto from 'node:crypto'
import { access, readdir, rm } from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

import { limit } from './concurrency.js'
import { OUT_DIR_MEDIA } from './fs.js'
import { rawFileUrl } from './github.js'

const PUBLIC_MEDIA_PATH = '/media'
const MAX_WIDTH = 1600
const DOWNLOAD_TIMEOUT_MS = 30_000

// 직접 올린 첨부 이미지만 사이트로 복사한다. 그 외 외부 이미지는 원본 링크를 유지한다.
const GITHUB_ASSET_URL =
  /^https:\/\/(github\.com\/user-attachments\/assets\/|github\.com\/[^/]+\/[^/]+\/assets\/|user-images\.githubusercontent\.com\/)/
const NON_RELATIVE_SRC = /^([a-z][a-z0-9+.-]*:|\/|#)/i

const CODE_SPANS = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]*`)/g
const HTML_IMAGE = /<img\b[^>]*>/gi
const MARKDOWN_IMAGE = /!\[([^\]]*)\]\(\s*([^)\s]+)(?:\s+"([^"]*)")?\s*\)/g

const mirrors = new Map()
const usedFiles = new Set()

const hash = value =>
  crypto.createHash('sha256').update(value).digest('hex').slice(0, 16)

const escapeAttr = value =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;')

const attrPattern = name =>
  new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'>]+))`, 'i')

function getAttr(tag, name) {
  const match = tag.match(attrPattern(name))
  return match ? (match[1] ?? match[2] ?? match[3]) : undefined
}

function setAttr(tag, name, value) {
  const attr = ` ${name}="${escapeAttr(value)}"`
  const pattern = attrPattern(name)
  return pattern.test(tag)
    ? tag.replace(pattern, () => attr)
    : tag.replace(/^<img\b/i, match => `${match}${attr}`)
}

/**
 * 복사 대상이면 내려받을 URL을 돌려준다.
 * GitHub 첨부 URL은 내용이 바뀌지 않으므로(immutable) 이미 받은 파일을 재사용한다.
 */
export function resolveImageSource(src, base) {
  if (GITHUB_ASSET_URL.test(src)) return { url: src, immutable: true }
  if (!base || NON_RELATIVE_SRC.test(src)) return null

  const [relativePath] = src.split(/[?#]/)
  let decoded = relativePath
  try {
    decoded = decodeURIComponent(relativePath)
  } catch {
    // 잘못된 percent-encoding이면 적힌 그대로의 파일명으로 취급한다.
  }

  const resolved = path.posix.join(base.dir, decoded)
  if (resolved.startsWith('..')) return null

  return {
    url: rawFileUrl(base.owner, base.repo, base.ref, resolved),
    immutable: false,
  }
}

/**
 * width/height 속성을 스켈레톤이 쓸 수 있는 한 쌍으로 맞춘다.
 * 작성자가 지정한 표시 크기는 유지하고, 비어 있는 쪽만 원본 비율로 채운다.
 */
export function fitDimensions(widthAttr, heightAttr, natural) {
  const isUnset = value => value === undefined || value === ''
  const isPixels = value => /^\d+$/.test(value) && Number(value) > 0

  if (!isUnset(widthAttr) && !isPixels(widthAttr)) return null
  if (!isUnset(heightAttr) && !isPixels(heightAttr)) return null
  if (!isUnset(widthAttr) && !isUnset(heightAttr)) return null

  if (!isUnset(widthAttr)) {
    const width = Number(widthAttr)
    return {
      width,
      height: Math.round((width * natural.height) / natural.width),
    }
  }
  if (!isUnset(heightAttr)) {
    const height = Number(heightAttr)
    return {
      width: Math.round((height * natural.width) / natural.height),
      height,
    }
  }
  return { width: natural.width, height: natural.height }
}

async function fileExists(file) {
  try {
    await access(file)
    return true
  } catch {
    return false
  }
}

async function download(url) {
  const res = await fetch(url, {
    signal: AbortSignal.timeout(DOWNLOAD_TIMEOUT_MS),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return Buffer.from(await res.arrayBuffer())
}

async function mirrorImage({ url, immutable }) {
  let bytes = null
  let name = immutable ? hash(url) : null

  if (!name) {
    bytes = await download(url)
    name = hash(bytes)
  }

  const fileName = `${name}.webp`
  const file = path.join(OUT_DIR_MEDIA, fileName)

  if (!(await fileExists(file))) {
    bytes ??= await download(url)
    await sharp(bytes, { animated: true })
      .autoOrient()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(file)
  }

  const { width, height } = await sharp(file).metadata()
  usedFiles.add(fileName)
  return { src: `${PUBLIC_MEDIA_PATH}/${fileName}`, width, height }
}

/** 실패하면 null을 돌려 원본 URL을 유지한다. 이미지 하나로 빌드를 깨지 않는다. */
function mirror(source) {
  if (!mirrors.has(source.url)) {
    mirrors.set(
      source.url,
      limit(() => mirrorImage(source)).catch(err => {
        console.warn(`⚠️ IMAGE: ${source.url} - ${err.message}`)
        return null
      }),
    )
  }
  return mirrors.get(source.url)
}

function missingImagePlaceholder(link) {
  if (!link) return ''
  return `<a href="${escapeAttr(link)}" target="_blank" rel="noopener noreferrer">원문 문제 보기</a>`
}

async function localizeHtmlImage(tag, { base, missingImageLink }) {
  const src = getAttr(tag, 'src')
  if (!src?.trim()) return missingImagePlaceholder(missingImageLink)

  const source = resolveImageSource(src, base)
  const mirrored = source && (await mirror(source))
  if (!mirrored) return tag

  const size = fitDimensions(
    getAttr(tag, 'width'),
    getAttr(tag, 'height'),
    mirrored,
  )
  const withSrc = setAttr(tag, 'src', mirrored.src)
  if (!size) return withSrc
  return setAttr(setAttr(withSrc, 'height', size.height), 'width', size.width)
}

async function localizeMarkdownImage(match, alt, src, title, { base }) {
  const source = resolveImageSource(src, base)
  const mirrored = source && (await mirror(source))
  if (!mirrored) return match

  const titleAttr = title ? ` title="${escapeAttr(title)}"` : ''
  return `<img alt="${escapeAttr(alt)}" src="${mirrored.src}" width="${mirrored.width}" height="${mirrored.height}"${titleAttr} />`
}

async function replaceAsync(text, pattern, replacer) {
  const replacements = await Promise.all(
    [...text.matchAll(pattern)].map(match => replacer(...match)),
  )
  let index = 0
  return text.replace(pattern, () => replacements[index++])
}

async function localizeText(text, context) {
  const htmlDone = await replaceAsync(text, HTML_IMAGE, tag =>
    localizeHtmlImage(tag, context),
  )
  return replaceAsync(htmlDone, MARKDOWN_IMAGE, (match, alt, src, title) =>
    localizeMarkdownImage(match, alt, src, title, context),
  )
}

/**
 * 본문의 이미지를 사이트 내부 경로로 바꾼다.
 * 코드 블록 안의 예시는 건드리지 않는다.
 *
 * @param base 상대경로 기준 { owner, repo, ref, dir }
 * @param missingImageLink src가 빈 이미지 자리에 넣을 원문 링크
 */
export async function localizeImages(markdown, context = {}) {
  // split에 캡처 그룹을 쓰면 홀수 인덱스가 코드 구간이 된다.
  const parts = await Promise.all(
    markdown
      .split(CODE_SPANS)
      .map((part, index) =>
        index % 2 === 1 ? part : localizeText(part, context),
      ),
  )
  return parts.join('')
}

/** 이번 빌드에서 쓰이지 않은 캐시 파일을 지운다. 글에서 뺀 이미지가 계속 배포되지 않게 한다. */
export async function pruneMirroredImages() {
  const files = await readdir(OUT_DIR_MEDIA)
  const stale = files.filter(file => !usedFiles.has(file))
  await Promise.all(
    stale.map(file => rm(path.join(OUT_DIR_MEDIA, file), { force: true })),
  )
  console.log(`🖼️ ${usedFiles.size} images mirrored, ${stale.length} pruned`)
}
