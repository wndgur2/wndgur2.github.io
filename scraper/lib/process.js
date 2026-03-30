import { writeFile } from 'node:fs/promises'
import path from 'node:path'

import { OUT_DIR_META } from './fs.js'
import { getPostWithId } from './hash.js'
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
    .map(getPostWithId)
    .filter(item => {
      if (ids.has(item.id)) {
        console.warn(`⚠️ Duplicate content id: ${item.id} (${item.title})`)
        return false
      } else {
        ids.add(item.id)
        return true
      }
    })
    .sort()

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
