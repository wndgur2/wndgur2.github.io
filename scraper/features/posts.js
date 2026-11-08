import path from 'node:path'

import matter from 'gray-matter'

import { getFileText, listTreeRecursive, safeBlobUrl } from '../lib/github.js'
import { normalizeTagsString, normalizeTitle, slugify } from '../lib/normalize.js'
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

      if (fm.isDraft) return null

      const tags = Array.isArray(fm.tags)
        ? [...fm.tags]
        : typeof fm.tags === 'string'
          ? normalizeTagsString(fm.tags)
          : []

      if (!fm.category) throw new Error(`Missing category`)

      const category = fm.category.toLowerCase()
      const slug = slugify(path.parse(file).name)

      return {
        slug,
        category,
        title: normalizeTitle(fm.title ?? slug),
        content,
        tags: tags.sort(),
        date_started: fm.date_started ?? 'No date found.',
        github: htmlUrl,
        // dev-log에 직접 쓴 프로젝트 글(category: Project)도 프로젝트 카드 정보를 갖게 한다.
        ...(category === 'project' && {
          description: fm.description ?? '',
          date_finished: fm.date_finished ?? '',
          head_count: fm.head_count ?? '',
          role: fm.role ?? '',
          ...(fm.thumbnail && { thumbnail: fm.thumbnail }),
        }),
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
