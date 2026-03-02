// scripts/fetch-content.js
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { Octokit } from '@octokit/rest'
import matter from 'gray-matter'
import pLimit from 'p-limit'

/** ===================== Config ===================== **/
const BLOG_DB_REPO = process.env.BLOG_DB_REPO ?? 'wndgur2/BlogDB' // owner/repo for posts
const BLOG_DB_REF = process.env.BLOG_DB_REF ?? 'main'
const POSTS_DIR = process.env.POSTS_DIR ?? 'posts' // subdir inside BlogDB

const PROJECTS_OWNER = process.env.PROJECTS_OWNER ?? 'wndgur2' // whose public repos to scan

const OUT_DIR_PUBLIC = 'public'
const OUT_DIR_META = path.join(OUT_DIR_PUBLIC, 'meta')
const OUT_DIR_POSTS = path.join(OUT_DIR_PUBLIC, 'posts')

const ALGO_REPO = process.env.ALGO_REPO ?? 'wndgur2/algorithm-problem-solves'
const ALGO_REF = process.env.ALGO_REF ?? 'main'
/** =================================================== **/

const octokit = new Octokit({
  auth: process.env.GH_PAT || process.env.GITHUB_TOKEN || undefined,
})

async function ensureDirs() {
  await mkdir(OUT_DIR_PUBLIC, { recursive: true })
  await mkdir(OUT_DIR_META, { recursive: true })
  await mkdir(OUT_DIR_POSTS, { recursive: true })
}

function safeBlobUrl({ owner, repo, ref, path: p }) {
  const encoded = p.split('/').map(encodeURIComponent).join('/')
  return `https://github.com/${owner}/${repo}/blob/${ref}/${encoded}`
}

function normalizeTitle(title) {
  return title.replace('?', '')
}

function normalizeTag(tag) {
  return tag
    .toLowerCase()
    .trim()
    .replace('/', ' ')
    .replace(/[\s_]+/g, '-')
}

function normalizeLang(langDir) {
  if (langDir.toLowerCase().includes('c++')) return 'cpp'
  if (langDir.toLowerCase().includes('c99')) return 'c'
  if (langDir.toLowerCase().includes('node')) return 'javascript'
  const res = langDir.toLowerCase()
  return res.replace('pypy', 'python')
}

function normalizeLevel(level) {
  if (!level) return ''

  const lower = level.toLowerCase().trim()

  // 1️⃣ 프로그래머스: level 0, level 2
  const levelMatch = lower.match(/^level\s*(\d+)/)
  if (levelMatch) {
    return `level${levelMatch[1]}`
  }

  // 2️⃣ 백준 스타일: Gold III, Silver IV 등
  const bojMatch = lower.match(
    /^(bronze|silver|gold|platinum|diamond)\s*(i{1,3}|iv|v)$/,
  )

  if (bojMatch) {
    const tier = bojMatch[1]
    const roman = bojMatch[2]

    const romanMap = {
      i: '1',
      ii: '2',
      iii: '3',
      iv: '4',
      v: '5',
    }

    return `${tier}${romanMap[roman] ?? ''}`
  }

  // 3️⃣ 혹시 이미 gold3 같은 형식이면 그대로
  if (/^(bronze|silver|gold|platinum|diamond)\d$/.test(lower)) {
    return lower
  }

  return lower.replace(/\s+/g, '')
}

const limit = pLimit(10) // 동시 10개

async function getRawFile(owner, repo, ref, filePath) {
  const encoded = filePath.split('/').map(encodeURIComponent).join('/')
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${encoded}`

  const res = await fetch(url)
  if (!res.ok) return null
  return await res.text()
}

function createProgressLogger(total, label = 'Processing') {
  let completed = 0
  const start = Date.now()

  return () => {
    completed++
    const percent = ((completed / total) * 100).toFixed(1)
    const elapsed = ((Date.now() - start) / 1000).toFixed(1)

    process.stdout.write(
      `\r${label}: ${completed}/${total} (${percent}%) | ${elapsed}s`,
    )

    if (completed === total) {
      process.stdout.write('\n')
    }
  }
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
  console.log('🚀 Fetching posts...')

  const [owner, repo] = BLOG_DB_REPO.split('/')
  const files = await findPostFiles(owner, repo, BLOG_DB_REF)

  const logProgress = createProgressLogger(files.length, 'Posts')

  console.log(`📚 Found ${files.length} posts`)

  const posts = (
    await Promise.all(
      files.map(file =>
        limit(async () => {
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

            return {
              id,
              category: fm.category?.toLowerCase() ?? 'project',
              title: normalizeTitle(fm.title ?? id),
              content,
              tags: tags.sort(),
              date_started: fm.date_started ?? 'No date found.',
              github: htmlUrl,
            }
          } catch (err) {
            console.error(`\n❌ Error processing ${file}:`, err.message)
            return null
          } finally {
            logProgress()
          }
        }),
      ),
    )
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
  const repos = (await listAllPublicRepos(PROJECTS_OWNER)).filter(r =>
    r.topics.some(t => t.toLowerCase() === 'ljh'),
  )

  console.log('🚀 Fetching projects...')

  console.log(`📚 Found ${repos.length} repositories`)

  const logProgress = createProgressLogger(repos.length, 'Projects')

  const projects = (
    await Promise.all(
      repos.map(r =>
        limit(async () => {
          try {
            const owner = r.owner.login
            const repo = r.name

            const readme = await fetchReadme(owner, repo)
            if (!readme) return null // only include repos that have a README

            const { data: fm, content } = matter(readme)

            const tags = Array.isArray(fm.tags)
              ? [...fm.tags]
              : typeof fm.tags === 'string'
                ? fm.tags
                    .replaceAll('"', '')
                    .replaceAll("'", '')
                    .split(',')
                    .map(normalizeTag)
                    .filter(Boolean)
                : Array.isArray(r.topics)
                  ? r.topics.filter(t => t.toLowerCase() !== 'ljh') // exclude 'ljh' topic
                  : []

            // Prefer front-matter dates; fallback to repo created_at in YYYY.MM.DD
            const createdDot = r.created_at
              ? new Date(r.created_at)
                  .toISOString()
                  .slice(0, 10)
                  .replace(/-/g, '.')
              : '-'

            const dateStarted = fm.date_started ?? createdDot

            return {
              id: repo,
              category: 'project',
              title: normalizeTitle(fm.title ?? repo),
              description: fm.description ?? r.description ?? '',
              tags,
              date_started: dateStarted,
              date_finished: fm.date_finished ?? '',
              head_count: fm.head_count ?? '',
              role: fm.role ?? '',
              github: r.html_url,
              content, // README body without front-matter
              thumbnail: fm.thumbnail ?? `/images/${repo.toLowerCase()}.jpeg`,
            }
          } catch (err) {
            console.error(`\n❌ Error processing ${r.name}:`, err.message)
            return null
          } finally {
            logProgress()
          }
        }),
      ),
    )
  ).filter(Boolean)

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

  console.log(`✅ Projects done (${projects.length} items generated)`)

  return projects
}

/* ===================== Algorithm Problems ===================== */

async function fetchAlgorithms() {
  console.log('🚀 Fetching algorithms...')

  const [owner, repo] = ALGO_REPO.split('/')

  // 1️⃣ 트리 한 번만 요청
  const tree = await listTreeRecursive(owner, repo, ALGO_REF)

  // 2️⃣ README 필터
  const readmeFiles = tree.filter(
    t =>
      t.type === 'blob' &&
      /README\.md$/i.test(t.path) &&
      t.path.split('/').length >= 5,
  )

  console.log(`📚 Found ${readmeFiles.length} algorithm problems`)

  const logProgress = createProgressLogger(readmeFiles.length, 'Algorithms')

  const algorithms = (
    await Promise.all(
      readmeFiles.map(file =>
        limit(async () => {
          try {
            const raw = await getRawFile(owner, repo, ALGO_REF, file.path)
            if (!raw) {
              logProgress()
              return null
            }

            const github = safeBlobUrl({
              owner,
              repo,
              ref: ALGO_REF,
              path: file.path,
            })

            const parts = file.path.split('/')
            const [langDir, site] = parts

            const language = normalizeLang(langDir)

            const matchTitle = raw.match(/^# \[(.*?)\] (.*?) - (\d+)/m)
            if (!matchTitle) {
              logProgress()
              return null
            }

            const difficultyRaw = matchTitle[1]
            const problemName = matchTitle[2]
            const problemNumber = matchTitle[3]

            const difficulty = normalizeLevel(difficultyRaw)

            const title = normalizeTitle(`${problemNumber}. ${problemName}`)

            const matchUrl = raw.match(/\[문제 링크\]\((.*?)\)/)
            const url = matchUrl ? matchUrl[1] : ''

            const matchTags = raw.match(/### 분류\n\n(.+?)\n/m)
            const algoTags = matchTags
              ? matchTags[1]
                  .split(',')
                  .map(s => s.trim())
                  .filter(Boolean)
              : []

            const matchDate = raw.match(
              /### 제출 일자\n\n(\d{4})년 (\d{1,2})월 (\d{1,2})일/,
            )

            let date_started = ''
            if (matchDate) {
              const [, y, m, d] = matchDate
              date_started = `${y}.${m.padStart(2, '0')}.${d.padStart(2, '0')}`
            }

            // 코드 파일 찾기 (README 제외)
            const baseDir = file.path.replace(/README\.md$/, '')
            const codeFile = tree.find(
              t =>
                t.type === 'blob' &&
                t.path.startsWith(baseDir) &&
                !t.path.endsWith('README.md'),
            )

            let code = ''
            if (codeFile) {
              const codeRaw = await getRawFile(
                owner,
                repo,
                ALGO_REF,
                codeFile.path,
              )
              code = codeRaw ?? ''
            }

            logProgress()

            const tags = [language, site, ...algoTags, difficulty].map(
              normalizeTag,
            )

            return {
              id: `${problemNumber}_${problemName}_${language.slice(0, 2)}`,
              category: 'algorithm',
              title,
              tags,
              date_started,
              url,
              content: raw,
              code,
              github,
            }
          } catch (err) {
            console.error(`\n❌ Error: ${file.path}`, err.message)
            logProgress()
            return null
          }
        }),
      ),
    )
  ).filter(Boolean)

  algorithms.sort(
    (a, b) =>
      String(b.date_started).localeCompare(String(a.date_started)) ||
      String(a.title).localeCompare(String(b.title)),
  )

  await writeFile(
    path.join(OUT_DIR_META, 'algorithms.json'),
    JSON.stringify(algorithms, null, 2),
    'utf8',
  )

  console.log(`✅ Algorithms done (${algorithms.length} items generated)`)

  return algorithms
}

/* ===================== Main ===================== */

async function main() {
  await ensureDirs()
  await fetchProjects()
  await fetchPosts()
  await fetchAlgorithms()
  console.log('✅ Static content generated under public/meta')
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
