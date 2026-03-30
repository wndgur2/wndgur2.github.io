type CountedValue = { value: string; count: number }

export const getCountedValuesInArray = <T, K extends keyof T>(
  items: T[],
  key: K & (T[K] extends readonly (string | number)[] ? K : never),
): CountedValue[] => {
  const keyCounts = new Map<string, number>()

  for (const item of items) {
    const values = item[key]

    if (!Array.isArray(values)) {
      throw new Error('The specified key does not point to an array')
    }

    for (const value of values) {
      const strValue = String(value)
      keyCounts.set(strValue, (keyCounts.get(strValue) ?? 0) + 1)
    }
  }

  return Array.from(keyCounts, ([value, count]) => ({ value, count })).sort(
    (a, b) => b.count - a.count,
  )
}
