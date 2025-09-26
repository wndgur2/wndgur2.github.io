// scripts/fetch-content.js
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { Octokit } from '@octokit/rest'
import matter from 'gray-matter'

/** ===================== Config ===================== **/
const BLOG_DB_REPO = process.env.BLOG_DB_REPO ?? 'wndgur2/BlogDB' // owner/repo for posts
const BLOG_DB_REF = process.env.BLOG_DB_REF ?? 'main'
const POSTS_DIR = process.env.POSTS_DIR ?? 'posts' // subdir inside BlogDB

const PROJECTS_OWNER = process.env.PROJECTS_OWNER ?? 'wndgur2' // whose public repos to scan

const OUT_DIR_PUBLIC = 'public'
const OUT_DIR_META = path.join(OUT_DIR_PUBLIC, 'meta')
const OUT_DIR_POSTS = path.join(OUT_DIR_PUBLIC, 'posts')
/** =================================================== **/

const octokit = new Octokit({
  auth: process.env.GH_PAT || process.env.GITHUB_TOKEN || undefined,
})

async function ensureDirs() {
  await mkdir(OUT_DIR_PUBLIC, { recursive: true })
  await mkdir(OUT_DIR_META, { recursive: true })
  await mkdir(OUT_DIR_POSTS, { recursive: true })
}

function slugFromPath(p) {
  return p
    .replace(/^\/+/, '')
    .replace(/\.[^/.]+$/, '')
    .replace(/[\/\\]/g, '-')
    .toLowerCase()
}

function safeBlobUrl({ owner, repo, ref, path: p }) {
  const encoded = p.split('/').map(encodeURIComponent).join('/')
  return `https://github.com/${owner}/${repo}/blob/${ref}/${encoded}`
}

/* ===================== Posts ===================== */

async function listTreeRecursive(owner, repo, ref) {
  const { data } = await octokit.git.getTree({
    owner,
    repo,
    tree_sha: ref,
    recursive: 'true',
  })
  return data.tree
}

async function getFileText(owner, repo, filePath, ref) {
  const { data } = await octokit.repos.getContent({
    owner,
    repo,
    path: filePath,
    ref,
  })
  if (Array.isArray(data)) return null // directory
  return Buffer.from(data.content, 'base64').toString('utf8')
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

async function fetchPosts() {
  const [owner, repo] = BLOG_DB_REPO.split('/')
  const files = await findPostFiles(owner, repo, BLOG_DB_REF)

  const posts = []
  for (const p of files) {
    const raw = await getFileText(owner, repo, p, BLOG_DB_REF)
    if (!raw) continue

    const { data: fm, content } = matter(raw)

    const slug = slugFromPath(p)
    const htmlUrl = safeBlobUrl({ owner, repo, ref: BLOG_DB_REF, path: p })

    const tags = Array.isArray(fm.tags)
      ? [...fm.tags]
      : typeof fm.tags === 'string'
        ? fm.tags
            .replaceAll('"', '')
            .replaceAll("'", '')
            .split(',')
            .map(s => s.trim())
            .filter(Boolean)
        : []
    if (!fm.title) continue // skip posts without title
    posts.push({
      id: p,
      category: fm.category ?? 'project', // change to 'OTHER' if you prefer
      title: fm.title,
      content,
      tags: tags.sort(),
      date_started: fm.date_started ?? 'No date found.',
      github: htmlUrl,
      preview: fm.preview ?? '',
      thumbnail: fm.thumbnail ?? undefined,
    })

    await writeFile(path.join(OUT_DIR_POSTS, `${slug}.md`), content, 'utf8')
  }

  // Sort newest-first by date_started (expects YYYY.MM.DD or similar)
  posts.sort(
    (a, b) =>
      String(b.date_started).localeCompare(String(a.date_started)) ||
      String(b.title).localeCompare(String(a.title)),
  )

  await writeFile(
    path.join(OUT_DIR_META, 'posts.json'),
    JSON.stringify(posts, null, 2),
    'utf8',
  )
  return posts
}

/* ===================== Projects (scan all public repos) ===================== */

function yyyymmddFromDotDate(dot) {
  // "2024.05.01" -> "20240501" for stable lexicographic sort
  if (typeof dot !== 'string') return ''
  const parts = dot.split('.')
  if (parts.length < 3) return ''
  const [y, m, d] = parts
  return `${y.padStart(4, '0')}${m.padStart(2, '0')}${d.padStart(2, '0')}`
}

async function fetchReadme(owner, repo) {
  try {
    const { data } = await octokit.repos.getReadme({ owner, repo })
    return Buffer.from(data.content, 'base64').toString('utf8')
  } catch {
    return null // skip repos without README
  }
}

async function listAllPublicRepos(user) {
  const repos = await octokit.paginate(octokit.repos.listForUser, {
    username: user,
    per_page: 100,
  })
  return repos.filter(r => !r.private)
}

async function fetchProjects() {
  const repos = await listAllPublicRepos(PROJECTS_OWNER)

  const projects = []

  for (const r of repos) {
    const owner = r.owner.login
    const repo = r.name

    const readme = await fetchReadme(owner, repo)
    if (!readme) continue // only include repos that have a README

    const { data: fm, content } = matter(readme)

    console.log(fm)
    console.log(fm.blog)

    if (!fm.blog) continue // skip repos without blog: true in front-matter

    const tags = Array.isArray(fm.tags)
      ? [...fm.tags]
      : typeof fm.tags === 'string'
        ? fm.tags
            .replaceAll('"', '')
            .replaceAll("'", '')
            .split(',')
            .map(s => s.trim())
            .filter(Boolean)
        : Array.isArray(r.topics)
          ? r.topics
          : []

    // Prefer front-matter dates; fallback to repo created_at in YYYY.MM.DD
    const createdDot = r.created_at
      ? new Date(r.created_at).toISOString().slice(0, 10).replace(/-/g, '.')
      : '-'

    const dateStarted = fm.date_started ?? createdDot

    projects.push({
      id: repo,
      category: fm.category ?? 'project',
      title: fm.title ?? repo,
      description: fm.description ?? r.description ?? '',
      tags,
      date_started: dateStarted,
      date_finished: fm.date_finished ?? '',
      head_count: fm.head_count ?? '',
      role: fm.role ?? '',
      github: r.html_url,
      content, // README body without front-matter
      thumbnail: fm.thumbnail ?? `/images/${repo.toLowerCase()}.jpeg`,
    })
  }

  // Sort newest first by date_started (dot format), then title
  projects.sort((a, b) => {
    const ad = yyyymmddFromDotDate(a.date_started)
    const bd = yyyymmddFromDotDate(b.date_started)
    return (
      bd.localeCompare(ad) || String(a.title).localeCompare(String(b.title))
    )
  })

  await writeFile(
    path.join(OUT_DIR_META, 'projects.json'),
    JSON.stringify(projects, null, 2),
    'utf8',
  )
  return projects
}

/* ===================== Main ===================== */

async function main() {
  await ensureDirs()
  await fetchPosts()
  await fetchProjects()
  console.log('✅ Static content generated under public/meta and public/posts')
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
