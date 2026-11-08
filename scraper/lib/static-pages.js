import { compiler } from 'markdown-to-jsx'
import { renderToStaticMarkup } from 'react-dom/server'

export const SITE_URL = 'https://wndgur2.github.io'
export const SITE_TITLE = '이중혁 블로그'
const AUTHOR = '이중혁'

// #root는 앱이 준비될 때까지 숨겨, 정적 본문이 스피너로 깜빡이지 않게 한다.
const PRERENDER_STYLE = `<style>
#prerender ~ #root { display: none; }
#prerender { min-height: 100vh; padding: 2em 1em; color: var(--content-color); background: var(--bg-color); }
#prerender > * { max-width: 80vw; margin: 0 auto 1.5em; }
#prerender h1 { font-size: 1.5em; margin-bottom: 0.3em; }
#prerender h2, #prerender h3, #prerender p, #prerender pre, #prerender ul, #prerender ol { margin: 0.8em 0; line-height: 1.6; }
#prerender li { list-style: disc inside; }
#prerender img, #prerender video { max-width: 100%; height: auto; }
#prerender pre { padding: 1em; overflow-x: auto; background: var(--dimmed-bg-color); border-radius: var(--radius); }
#prerender table { display: block; overflow-x: auto; }
#prerender nav { display: flex; justify-content: space-between; gap: 1em; }
@media (max-width: 768px) { #prerender > * { max-width: 100%; } }
</style>`

const THEME_SCRIPT = `<script>try{if(localStorage.getItem('theme')==='light')document.getElementById('prerender').dataset.theme='light'}catch(e){}</script>`

const renderNothing = () => null
const MARKDOWN_OPTIONS = {
  overrides: {
    script: { component: renderNothing },
    style: { component: renderNothing },
    link: { component: renderNothing },
    img: { props: { loading: 'lazy' } },
  },
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export function getPostUrl(post) {
  return `${SITE_URL}/post/${encodeURIComponent(post.id)}`
}

export function createExcerpt(markdown, maxLength = 160) {
  const text = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^\s*(#{1,6}|>|[-*+]|\d+\.)\s+/gm, '')
    .replace(/[*_`~|]|-{2,}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text
}

const toSiteUrl = path => (path ? `${SITE_URL}${path}` : undefined)

function findFirstImage(markdown) {
  return (
    markdown.match(/!\[[^\]]*\]\((https?:[^)\s]+)/)?.[1] ??
    markdown.match(/<img[^>]+src=["'](https?:[^"']+)/)?.[1] ??
    toSiteUrl(markdown.match(/<img[^>]+src=["'](\/media\/[^"']+)/)?.[1])
  )
}

/** "2026.04.07" 형식의 날짜를 ISO 형식으로 변환한다. 날짜가 아니면 undefined. */
function toIsoDate(date) {
  const match = String(date).match(/^(\d{4})[.-](\d{1,2})[.-](\d{1,2})/)
  if (!match) return undefined
  const [, y, m, d] = match
  return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`
}

/** index.html의 `<!-- seo:name:start -->` ~ `<!-- seo:name:end -->` 구간을 교체한다. */
function replaceBlock(html, name, content) {
  const pattern = new RegExp(
    `<!-- seo:${name}:start -->[\\s\\S]*?<!-- seo:${name}:end -->`,
  )
  if (!pattern.test(html)) throw new Error(`Missing seo:${name} block`)
  return html.replace(pattern, () => content)
}

function renderHead(post, imageUrl) {
  const title = `${post.title} | ${SITE_TITLE}`
  const description = post.description || createExcerpt(post.content) || title
  const url = getPostUrl(post)
  const datePublished = toIsoDate(post.date_started)

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description,
    url,
    author: { '@type': 'Person', name: AUTHOR, url: SITE_URL },
    ...(datePublished && { datePublished }),
    ...(imageUrl && { image: imageUrl }),
  }).replaceAll('<', '\\u003c')

  const meta = (key, name, content) =>
    content
      ? `<meta ${key}="${name}" content="${escapeHtml(content)}" />`
      : ''

  return [
    `<title>${escapeHtml(title)}</title>`,
    meta('name', 'description', description),
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    meta('property', 'og:site_name', SITE_TITLE),
    meta('property', 'og:locale', 'ko_KR'),
    meta('property', 'og:type', 'article'),
    meta('property', 'og:title', post.title),
    meta('property', 'og:description', description),
    meta('property', 'og:url', url),
    meta('property', 'og:image', imageUrl),
    meta('property', 'article:published_time', datePublished),
    meta('name', 'twitter:card', imageUrl ? 'summary_large_image' : 'summary'),
    `<script type="application/ld+json">${jsonLd}</script>`,
    PRERENDER_STYLE,
  ]
    .filter(Boolean)
    .join('\n  ')
}

function renderAdjacentLink(post, label) {
  return post
    ? `<a href="/post/${encodeURIComponent(post.id)}">${label}: ${escapeHtml(post.title)}</a>`
    : '<span></span>'
}

function renderBody(post, { prev, next }) {
  const dates = [post.date_started, post.date_finished]
    .filter(Boolean)
    .join(' ~ ')
  const tags = post.tags.map(tag => `#${escapeHtml(tag)}`).join(' ')
  const content = renderToStaticMarkup(
    compiler(post.content, MARKDOWN_OPTIONS),
  )

  return `<div id="prerender" data-theme="dark">
    ${THEME_SCRIPT}
    <div><a href="/">${SITE_TITLE}</a></div>
    <article>
      <header>
        <h1>${escapeHtml(post.title)}</h1>
        <p><small>${escapeHtml(dates)}</small></p>
        <p><small>${tags}</small></p>
        <p><a href="${escapeHtml(post.github)}">GitHub</a></p>
      </header>
      <div>${content}</div>
    </article>
    <nav>
      ${renderAdjacentLink(next, 'next')}
      ${renderAdjacentLink(prev, 'previous')}
    </nav>
  </div>`
}

/**
 * index.html을 템플릿으로 게시글 페이지를 만든다.
 * adjacent는 앱과 같은 의미의 이전/다음 글, imagePath는 사이트 내부 대표 이미지 경로.
 */
export function renderPostPage(template, post, adjacent, imagePath) {
  const imageUrl = imagePath
    ? `${SITE_URL}${imagePath}`
    : findFirstImage(post.content)

  return replaceBlock(
    replaceBlock(template, 'head', renderHead(post, imageUrl)),
    'body',
    renderBody(post, adjacent),
  )
}

/** JS를 실행하지 않는 크롤러도 글을 찾을 수 있도록 홈에 글 목록을 넣는다. */
export function renderHomePage(template, posts) {
  const links = posts
    .map(
      post =>
        `<li><a href="/post/${encodeURIComponent(post.id)}">${escapeHtml(post.title)}</a></li>`,
    )
    .join('\n      ')

  return replaceBlock(
    template,
    'body',
    `<noscript>
    <h1>${SITE_TITLE}</h1>
    <ul>
      ${links}
    </ul>
  </noscript>`,
  )
}

export function renderSitemap(posts) {
  const urls = [`${SITE_URL}/`, ...posts.map(getPostUrl)]
    .map(url => `  <url><loc>${escapeHtml(url)}</loc></url>`)
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

export function renderRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`
}
