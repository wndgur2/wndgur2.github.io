const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function fetchJSON<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url)
    await delay(20000)

    if (!res.ok) {
      throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`)
    }
    const data: T = await res.json()
    return data
  } catch (e) {
    console.error(`Failed to load ${url}`, e)
    throw e
  }
}
