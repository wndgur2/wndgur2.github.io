import { config } from '../config/index.js'
import { getRawFile, listTreeRecursive, safeBlobUrl } from '../lib/github.js'
import {
  normalizeLang,
  normalizeLevel,
  normalizeTag,
  normalizeTagsString,
  normalizeTitle,
} from '../lib/normalize.js'
import { fetchAndProcess } from '../lib/process.js'

export async function fetchAlgorithms() {
  const [owner, repo] = config.algorithms.repo.split('/')

  const tree = await listTreeRecursive(owner, repo, config.algorithms.ref)
  const files = tree.filter(
    t =>
      t.type === 'blob' &&
      /README\.md$/i.test(t.path) &&
      t.path.split('/').length >= 5,
  )

  return await fetchAndProcess({
    srcs: files,
    processor: async file => {
      const raw = await getRawFile(
        owner,
        repo,
        config.algorithms.ref,
        file.path,
      )
      if (!raw) throw new Error('Failed to getRawFile()')

      const github = safeBlobUrl({
        owner,
        repo,
        ref: config.algorithms.ref,
        path: file.path,
      })

      const [langDir, site] = file.path.split('/')

      const matchTitle = raw.match(/^# \[(.*?)\] (.*?) - (\d+)/m)
      if (!matchTitle) throw new Error('Failed to match title')

      const [, difficultyRaw, problemName, problemNumber] = matchTitle

      // tags
      const matchTags = raw.match(/### 분류\n\n(.+?)\n/m)
      const algoTags = normalizeTagsString(matchTags?.[1] || '')
      const language = normalizeLang(langDir)
      const difficulty = normalizeLevel(difficultyRaw)
      const tags = [language, site, ...algoTags, difficulty].map(normalizeTag)

      // title
      const title = normalizeTitle(`${problemNumber}. ${problemName}`)

      // problem url
      const url = raw.match(/\[문제 링크\]\((.*?)\)/)?.[1] || ''

      // date_started
      const matchDate = raw.match(
        /### 제출 일자\n\n(\d{4})년 (\d{1,2})월 (\d{1,2})일/,
      )
      let date_started = ''
      if (matchDate) {
        const [, y, m, d] = matchDate
        date_started = `${y}.${m.padStart(2, '0')}.${d.padStart(2, '0')}`
      }

      // code
      const baseDir = file.path.replace(/README\.md$/, '')
      const codeFile = tree.find(
        t =>
          t.type === 'blob' &&
          t.path.startsWith(baseDir) &&
          !t.path.endsWith('README.md'),
      )
      let code = codeFile
        ? await getRawFile(owner, repo, config.algorithms.ref, codeFile.path)
        : ''

      return {
        category: 'algorithm',
        title,
        tags,
        date_started,
        url,
        content: raw,
        code,
        github,
      }
    },
    label: 'ALGORITHM',
    postProcessors: [
      items =>
        items.sort(
          (a, b) =>
            String(b.date_started).localeCompare(String(a.date_started)) ||
            String(a.title).localeCompare(String(b.title)),
        ),
    ],
  })
}
