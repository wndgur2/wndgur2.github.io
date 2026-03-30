import matter from 'gray-matter'

import { getFileText, listTreeRecursive, safeBlobUrl } from '../lib/github.js'
import { normalizeTagsString, normalizeTitle } from '../lib/normalize.js'
import { fetchAndProcess } from '../lib/process.js'

const POSTS_DIR = process.env.POSTS_DIR ?? 'posts'
const BLOG_DB_REPO = process.env.BLOG_DB_REPO ?? 'wndgur2/BlogDB'
const BLOG_DB_REF = process.env.BLOG_DB_REF ?? 'main'

export async function fetchPosts() {
  const [owner, repo] = BLOG_DB_REPO.split('/')
  const files = await findPostFiles(owner, repo, BLOG_DB_REF)

  await fetchAndProcess({
    srcs: files,
    processor: async file => {
      const raw = await getFileText(owner, repo, file, BLOG_DB_REF)

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
          ? normalizeTagsString(fm.tags)
          : []

      if (!fm.category) throw new Error(`Missing category`)

      const category = fm.category.toLowerCase()

      return {
        category,
        title: normalizeTitle(fm.title ?? id),
        content,
        tags: tags.sort(),
        date_started: fm.date_started ?? 'No date found.',
        github: htmlUrl,
      }
    },
    label: 'POST',
  })
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
