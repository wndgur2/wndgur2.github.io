export function createProgressLogger(total, label) {
  let completed = 0
  const start = Date.now()

  return () => {
    completed++
    const percent = ((completed / total) * 100).toFixed(1)
    const elapsed = ((Date.now() - start) / 1000).toFixed(1)

    process.stdout.write(
      `\r${label}: ${completed}/${total} (${percent}%) | ${elapsed}s`,
    )

    if (completed === total) process.stdout.write('\n')
  }
}
