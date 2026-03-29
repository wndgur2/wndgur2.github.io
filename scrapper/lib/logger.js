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
      `\r${label}: ${completed}/${total} (${percent}%) | ${elapsed}s`,
    )

    if (completed === total) process.stdout.write('\n')
  }
}

export async function mapWithProgress(items, options) {
  const { label, batchSize = 20, limit: limiter, mapper } = options
  const runLimited = typeof limiter === 'function' ? limiter : fn => fn()
  const logProgress = createProgressLogger(items.length, label, { batchSize })

  return Promise.all(
    items.map(item =>
      runLimited(async () => {
        try {
          return await mapper(item)
        } finally {
          logProgress()
        }
      }),
    ),
  )
}
