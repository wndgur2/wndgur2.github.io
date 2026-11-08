import { writeFile } from 'node:fs/promises'
import path from 'node:path'

import { OUT_DIR_META } from './fs.js'
import { getPostWithId } from './hash.js'
import { localizeImages } from './images.js'
import { mapWithProgress } from './logger.js'

export async function fetchAndProcess({
  srcs,
  processor,
  postProcessors = [],
  label,
}) {
  console.log(`🔍 Found ${srcs.length} ${label}${srcs.length > 1 ? 's' : ''}`)

  const [fetchedItems, errors] = await mapWithProgress(srcs, {
    label,
    mapper: processor,
  })

  const ids = new Set()
  const items = fetchedItems
    .filter(Boolean)
    // legacy_id가 원본 본문 기준으로 유지되도록 이미지 변환 전에 해시한다.
    .map(({ imageBase, ...item }) => ({ ...getPostWithId(item), imageBase }))
    .filter(item => {
      if (ids.has(item.id)) {
        console.warn(`⚠️ Duplicate content id: ${item.id} (${item.title})`)
        return false
      } else {
        ids.add(item.id)
        return true
      }
    })
    .sort((a, b) => new Date(b.date_started) - new Date(a.date_started))

  await Promise.all(
    items.map(async item => {
      const { imageBase: base } = item
      delete item.imageBase
      item.content = await localizeImages(item.content, {
        base,
        missingImageLink: item.url,
      })
    }),
  )

  for (const fn of postProcessors) {
    fn(items)
  }

  await writeFile(
    path.join(OUT_DIR_META, `${label.toLowerCase()}s.json`),
    JSON.stringify(items, null, 2),
    'utf8',
  )

  for (const err of errors) {
    console.error(`⚠️ ${label}: ${err.file} - ${err.error}`)
  }

  console.log(
    `✅ ${items.length} ${label}${items.length > 1 ? 's' : ''} processed, ${srcs.length - items.length} items skipped\n`,
  )

  return items
}
