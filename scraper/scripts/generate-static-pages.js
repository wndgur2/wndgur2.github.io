import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

import {
  renderHomePage,
  renderPostPage,
  renderRobots,
  renderSitemap,
} from '../lib/static-pages.js'

const OUT_DIR = 'dist'
const META_DIR = path.join(OUT_DIR, 'meta')

async function readMeta(name) {
  return JSON.parse(await readFile(path.join(META_DIR, `${name}.json`), 'utf8'))
}

// 게시글과 프로젝트만 색인 대상으로 삼는다. 알고리즘 풀이는 기존 SPA 폴백으로 제공한다.
async function readIndexablePosts() {
  const [posts, projects] = await Promise.all([
    readMeta('posts'),
    readMeta('projects'),
  ])
  const items = [...projects, ...posts].sort(
    (a, b) =>
      new Date(b.date_started).getTime() - new Date(a.date_started).getTime(),
  )

  const ids = new Set()
  for (const { id } of items) {
    if (ids.has(id)) throw new Error(`Duplicate post id: ${id}`)
    ids.add(id)
  }
  return items
}

function findImagePath(post) {
  return post.thumbnail && existsSync(path.join(OUT_DIR, post.thumbnail))
    ? post.thumbnail
    : undefined
}

async function main() {
  await writeFile(path.join(OUT_DIR, 'robots.txt'), renderRobots(), 'utf8')

  if (!existsSync(META_DIR)) {
    console.warn('⚠️ dist/meta not found. Skipping static pages.')
    return
  }

  const template = await readFile(path.join(OUT_DIR, 'index.html'), 'utf8')
  const posts = await readIndexablePosts()

  // GitHub Pages는 /post/x 요청에 post/x.html을 200으로 응답한다.
  await mkdir(path.join(OUT_DIR, 'post'), { recursive: true })
  await Promise.all(
    posts.map((post, index) =>
      writeFile(
        path.join(OUT_DIR, 'post', `${post.id}.html`),
        renderPostPage(
          template,
          post,
          { prev: posts[index + 1], next: posts[index - 1] },
          findImagePath(post),
        ),
        'utf8',
      ),
    ),
  )

  await writeFile(
    path.join(OUT_DIR, 'index.html'),
    renderHomePage(template, posts),
    'utf8',
  )
  await writeFile(
    path.join(OUT_DIR, 'sitemap.xml'),
    renderSitemap(posts),
    'utf8',
  )

  console.log(`✅ ${posts.length} static pages generated under dist/post`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
