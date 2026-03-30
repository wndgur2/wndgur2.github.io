import matter from 'gray-matter'

import { config } from '../config/index.js'
import { octokit } from '../lib/github.js'
import { normalizeTag, normalizeTitle } from '../lib/normalize.js'
import { fetchAndProcess } from '../lib/process.js'

export async function fetchProjects() {
  const repos = (await listAllPublicRepos(config.projects.owner)).filter(
    repository => repository.topics.some(t => t.toLowerCase() === 'ljh'),
  )

  await fetchAndProcess({
    srcs: repos,
    processor: async repository => {
      const owner = repository.owner.login
      const repo = repository.name

      const readme = await fetchReadme(owner, repo)
      if (!readme) return null

      const { data: fm, content } = matter(readme)

      const tags = repository.topics
        .filter(t => t.toLowerCase() !== 'ljh')
        .map(normalizeTag)

      // Prefer front-matter dates; fallback to repo created_at in YYYY.MM.DD
      const createdDot = repository.created_at
        ? new Date(repository.created_at)
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, '.')
        : '-'

      const dateStarted = fm.date_started ?? createdDot

      return {
        category: 'project',
        title: normalizeTitle(fm.title ?? repo),
        description: fm.description ?? repository.description ?? '',
        tags,
        date_started: dateStarted,
        date_finished: fm.date_finished ?? '',
        head_count: fm.head_count ?? '',
        role: fm.role ?? '',
        github: repository.html_url,
        content, // README body without front-matter
        thumbnail: `/images/${repo.toLowerCase()}.jpeg`,
      }
    },
    label: 'PROJECT',
    postProcessors: [
      pjts =>
        pjts.sort((a, b) => {
          const ad = yyyymmddFromDotDate(a.date_started)
          const bd = yyyymmddFromDotDate(b.date_started)
          return (
            bd.localeCompare(ad) ||
            String(a.title).localeCompare(String(b.title))
          )
        }),
    ],
  })
}

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
