import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

import { limit } from '../lib/concurrency.js'
import { OUT_DIR_META } from '../lib/fs.js'
import { getFileText, listTreeRecursive, safeBlobUrl } from '../lib/github.js'
import { mapWithProgress } from '../lib/logger.js'
import { normalizeTag, normalizeTitle } from '../lib/normalize.js'

const POSTS_DIR = process.env.POSTS_DIR ?? 'posts'
const BLOG_DB_REPO = process.env.BLOG_DB_REPO ?? 'wndgur2/BlogDB'
const BLOG_DB_REF = process.env.BLOG_DB_REF ?? 'main'

export async function fetchPosts() {
  console.log('🚀 Fetching posts...')

  const [owner, repo] = BLOG_DB_REPO.split('/')
  const files = await findPostFiles(owner, repo, BLOG_DB_REF)

  console.log(`📚 Found ${files.length} posts`)

  const posts = (
    await mapWithProgress(files, {
      label: 'Posts',
      batchSize: 20,
      limit,
      mapper: async file => {
        try {
          const raw = await getFileText(owner, repo, file, BLOG_DB_REF)
          if (!raw) return null

          const { data: fm, content } = matter(raw)

          const htmlUrl = safeBlobUrl({
            owner,
            repo,
            ref: BLOG_DB_REF,
            path: file,
          })

          const tags = Array.isArray(fm.tags)
            ? [...fm.tags]
            : typeof fm.tags === 'string'
              ? fm.tags
                  .replaceAll('"', '')
                  .replaceAll("'", '')
                  .split(',')
                  .map(normalizeTag)
                  .filter(Boolean)
              : []

          const id = file.replace(/^posts\//, '').replace(/\.(md|mdx)$/, '')
          const category = fm.category?.toLowerCase()
          if (!category) {
            return console.warn(
              `\n⚠️  Skipping ${file} due to missing category`,
            )
          }

          return {
            id,
            category,
            title: normalizeTitle(fm.title ?? id),
            content,
            tags: tags.sort(),
            date_started: fm.date_started ?? 'No date found.',
            github: htmlUrl,
          }
        } catch (err) {
          console.error(`\n❌ Error processing ${file}:`, err.message)
          return null
        }
      },
    })
  ).filter(Boolean)

  posts.sort(
    (a, b) =>
      String(b.date_started).localeCompare(String(a.date_started)) ||
      String(a.title).localeCompare(String(b.title)),
  )

  await writeFile(
    path.join(OUT_DIR_META, 'posts.json'),
    JSON.stringify(posts, null, 2),
    'utf8',
  )

  console.log(`✅ Posts done (${posts.length} items generated)`)

  return posts
}

async function findPostFiles(owner, repo, ref) {
  const tree = await listTreeRecursive(owner, repo, ref)
  const prefix = POSTS_DIR.endsWith('/') ? POSTS_DIR : `${POSTS_DIR}/`
  const files = tree
    .filter(
      t =>
        t.type === 'blob' &&
        t.path.startsWith(prefix) &&
        /\.(md|mdx)$/i.test(t.path),
    )
    .map(t => t.path)
  files.sort((a, b) => a.localeCompare(b))
  return files
}
