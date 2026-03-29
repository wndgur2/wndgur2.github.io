import { writeFile } from 'node:fs/promises'
import path from 'node:path'

import { config } from '../config/index.js'
import { limit } from '../lib/concurrency.js'
import { OUT_DIR_META } from '../lib/fs.js'
import { getRawFile, listTreeRecursive, safeBlobUrl } from '../lib/github.js'
import { createProgressLogger } from '../lib/logger.js'
import {
  normalizeLang,
  normalizeLevel,
  normalizeTag,
  normalizeTitle,
} from '../lib/normalize.js'

export async function fetchAlgorithms() {
  console.log('🚀 Fetching algorithms...')

  const [owner, repo] = config.algorithms.repo.split('/')

  // 1️⃣ 트리 한 번만 요청
  const tree = await listTreeRecursive(owner, repo, config.algorithms.ref)

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
            const raw = await getRawFile(
              owner,
              repo,
              config.algorithms.ref,
              file.path,
            )
            if (!raw) return null

            const github = safeBlobUrl({
              owner,
              repo,
              ref: config.algorithms.ref,
              path: file.path,
            })

            const parts = file.path.split('/')
            const [langDir, site] = parts

            const language = normalizeLang(langDir)

            const matchTitle = raw.match(/^# \[(.*?)\] (.*?) - (\d+)/m)
            if (!matchTitle) return null

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
                config.algorithms.ref,
                codeFile.path,
              )
              code = codeRaw ?? ''
            }

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
            return null
          } finally {
            logProgress()
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
