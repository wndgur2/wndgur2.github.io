import { limit } from './concurrency.js'

export function createProgressLogger(total, label, options = {}) {
  const batchSize = Number.isFinite(options.batchSize)
    ? Math.max(1, Math.floor(options.batchSize))
    : 20

  let completed = 0
  const start = Date.now()

  return () => {
    completed++

    const shouldLog = completed === total || completed % batchSize === 0
    if (!shouldLog) return

    const percent = ((completed / total) * 100).toFixed(1)
    const elapsed = ((Date.now() - start) / 1000).toFixed(1)

    process.stdout.write(
      `\r🚀 ${label}: ${completed}/${total} (${percent}%) | ${elapsed}s`,
    )

    if (completed === total) process.stdout.write('\n')
  }
}

export async function mapWithProgress(items, options) {
  const { label, mapper } = options
  const batchSize = 20
  const logProgress = createProgressLogger(items.length, label, { batchSize })
  let errors = []

  const res = await Promise.all(
    items.map(file =>
      limit(async () => {
        try {
          return await mapper(file)
        } catch (err) {
          errors.push({ file, error: err.message })
          return null
        } finally {
          logProgress()
        }
      }),
    ),
  )
  return [res, errors]
}
