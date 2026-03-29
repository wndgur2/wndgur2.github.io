import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

import { config } from '../config/index.js'
import { limit } from '../lib/concurrency.js'
import { OUT_DIR_META } from '../lib/fs.js'
import { octokit } from '../lib/github.js'
import { mapWithProgress } from '../lib/logger.js'
import { normalizeTag, normalizeTitle } from '../lib/normalize.js'

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

export async function fetchProjects() {
  const repos = (await listAllPublicRepos(config.projects.owner)).filter(r =>
    r.topics.some(t => t.toLowerCase() === 'ljh'),
  )

  console.log('🚀 Fetching projects...')

  console.log(`📚 Found ${repos.length} repositories`)

  const projects = (
    await mapWithProgress(repos, {
      label: 'Projects',
      batchSize: 20,
      limit,
      mapper: async r => {
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
            thumbnail: `/images/${repo.toLowerCase()}.jpeg`,
          }
        } catch (err) {
          console.error(`\n❌ Error processing ${r.name}:`, err.message)
          return null
        }
      },
    })
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
