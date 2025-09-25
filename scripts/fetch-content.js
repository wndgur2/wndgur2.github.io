// scripts/fetch-content.js
import { writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import { Octokit } from '@octokit/rest'
import process from 'node:process'

/** ===================== Config ===================== **/
const BLOG_DB_REPO = process.env.BLOG_DB_REPO ?? 'wndgur2/BlogDB' // owner/repo
const BLOG_DB_REF  = process.env.BLOG_DB_REF  ?? 'main'           // branch
const POSTS_DIR    = process.env.POSTS_DIR    ?? 'posts'          // folder in BlogDB containing .md

const OWNER_FOR_PROJECTS = process.env.OWNER_FOR_PROJECTS ?? 'wndgur2' // owner whose repos contain projects
const PROJECTS_META_PATH = process.env.PROJECTS_META_PATH ?? 'meta/projects.json' // in *this* site repo
const OUT_DIR_PUBLIC      = 'public'
const OUT_DIR_META        = path.join(OUT_DIR_PUBLIC, 'meta')
const OUT_DIR_POSTS       = path.join(OUT_DIR_PUBLIC, 'posts')

/** =================================================== **/

const octokit = new Octokit({
  auth: process.env.GH_PAT // set in Actions → Secrets → GH_PAT
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

/**
 * Recursively list all files under a directory in a repo/ref
 */
async function listRepoFilesRecursive({ owner, repo, ref, dir }) {
  // Use Git Trees API for recursion
  const { data: treeData } = await octokit.git.getTree({
    owner, repo, tree_sha: ref, recursive: 'true'
  })

  // Filter tree entries inside dir
  const prefix = dir.endsWith('/') ? dir : `${dir}/`
  return treeData.tree
    .filter((t) => t.type === 'blob' && t.path.startsWith(prefix))
    .map((t) => t.path)
}

/**
 * Get a file's text content from a repo
 */
async function getFileText({ owner, repo, path: filePath, ref }) {
  const { data } = await octokit.repos.getContent({ owner, repo, path: filePath, ref })
  // For blobs, content is base64-encoded
  // data can be array (for dir) or object (for file)
  if (Array.isArray(data)) throw new Error(`Path is a directory: ${filePath}`)
  const buff = Buffer.from(data.content, 'base64')
  return buff.toString('utf-8')
}

/**
 * Fetch all posts: parse frontmatter + content
 */
async function fetchPosts() {
  const [owner, repo] = BLOG_DB_REPO.split('/')
  const files = await listRepoFilesRecursive({ owner, repo, ref: BLOG_DB_REF, dir: POSTS_DIR })
  const mdFiles = files.filter((p) => p.toLowerCase().endsWith('.md') || p.toLowerCase().endsWith('.mdx'))

  const posts = []
  for (const p of mdFiles) {
    const raw = await getFileText({ owner, repo, path: p, ref: BLOG_DB_REF })
    const { data: fm, content } = matter(raw)

    const id = p // keep original path as ID
    const slug = slugFromPath(p)
    const htmlUrl = `https://github.com/${owner}/${repo}/blob/${BLOG_DB_REF}/${encodeURIComponent(p)}`

    // Map to your IPost shape (adjust as needed)
    const post = {
      id,
      category: fm.category ?? 'OTHER',
      title: fm.title ?? 'No title found.',
      content, // raw markdown body (no frontmatter)
      tags: Array.isArray(fm.tags)
        ? [...fm.tags].sort()
        : typeof fm.tags === 'string'
          ? fm.tags.replaceAll('"','').replaceAll("'",'').split(',').map(s=>s.trim()).filter(Boolean).sort()
          : [],
      date_started: fm.date_started ?? 'No date found.',
      github: htmlUrl,
      preview: fm.preview ?? '',
      thumbnail: fm.thumbnail ?? undefined
    }

    posts.push(post)

    // Also write the raw markdown body for lazy loading (optional)
    await writeFile(path.join(OUT_DIR_POSTS, `${slug}.md`), content, 'utf8')
  }

  // Sort descending by date_started (fallback title)
  posts.sort((a, b) => String(b.date_started).localeCompare(String(a.date_started)) || String(b.title).localeCompare(String(a.title)))
  await writeFile(path.join(OUT_DIR_META, 'posts.json'), JSON.stringify(posts, null, 2), 'utf8')

  return posts
}

/**
 * Read projects meta from the site repo and enrich with README content from each repo.
 * Assumes each entry has { title, ... } where title === repo name.
 */
import { readFile } from 'node:fs/promises'
async function fetchProjects() {
  // Load the curated list from your site repo
  let projectsMeta = []
  try {
    const raw = await readFile(PROJECTS_META_PATH, 'utf8')
    const parsed = JSON.parse(raw)
    // Support { "<key>": {...} } or [ {...} ]
    projectsMeta = Array.isArray(parsed) ? parsed : Object.values(parsed)
  } catch (e) {
    console.warn(`Could not read ${PROJECTS_META_PATH}. Falling back to empty list.`)
    projectsMeta = []
  }

  const owner = OWNER_FOR_PROJECTS

  const enriched = []
  for (const project of projectsMeta) {
    const repo = project.title // or project.repo if you have a different field
    let readme = ''
    try {
      const { data } = await octokit.repos.getReadme({ owner, repo })
      const buff = Buffer.from(data.content, 'base64')
      readme = buff.toString('utf8')
    } catch {
      readme = 'This project is not available.'
    }

    enriched.push({
      ...project,
      id: project.id ?? repo,
      content: readme,
      thumbnail: project.thumbnail ?? `/images/${String(repo).toLowerCase()}.jpeg`
    })
  }

  // Optional: sort by a field you maintain (e.g., date or pinned order)
  await writeFile(path.join(OUT_DIR_META, 'projects.json'), JSON.stringify(enriched, null, 2), 'utf8')
  return enriched
}

/** Main runner */
async function main() {
  if (!process.env.GH_PAT) {
    console.error('GH_PAT is missing. Add it as a GitHub Actions secret and expose to this job.')
    process.exit(1)
  }
  await ensureDirs()
  await fetchPosts()
  await fetchProjects()
  console.log('Static content generated under public/meta and public/posts.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
