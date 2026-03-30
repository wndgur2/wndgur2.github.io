export function normalizeTitle(title) {
  return title.replace('?', '')
}

export function normalizeTagsString(tagsString) {
  return tagsString
    .replaceAll('"', '')
    .replaceAll("'", '')
    .split(',')
    .map(normalizeTag)
    .filter(Boolean)
    .sort()
}

export function normalizeTag(tag) {
  return tag
    .toLowerCase()
    .trim()
    .replace('/', ' ')
    .replace(/[\s_]+/g, '')
}

export function normalizeLang(langDir) {
  if (langDir.toLowerCase().includes('c++')) return 'cpp'
  if (langDir.toLowerCase().includes('c99')) return 'c'
  if (langDir.toLowerCase().includes('node')) return 'javascript'
  return langDir.toLowerCase().replace('pypy', 'python')
}

export function normalizeLevel(level) {
  if (!level) return ''

  const lower = level.toLowerCase().trim()

  const levelMatch = lower.match(/^level\s*(\d+)/)
  if (levelMatch) return `level${levelMatch[1]}`

  const bojMatch = lower.match(
    /^(bronze|silver|gold|platinum|diamond)\s*(i{1,3}|iv|v)$/,
  )

  if (bojMatch) {
    const romanMap = { i: '1', ii: '2', iii: '3', iv: '4', v: '5' }
    return `${bojMatch[1]}${romanMap[bojMatch[2]] ?? ''}`
  }

  if (/^(bronze|silver|gold|platinum|diamond)\d$/.test(lower)) {
    return lower
  }

  return lower.replace(/\s+/g, '')
}
