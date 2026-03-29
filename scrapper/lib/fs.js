import { mkdir } from 'node:fs/promises'
import path from 'node:path'

export const OUT_DIR_PUBLIC = 'public'
export const OUT_DIR_META = path.join(OUT_DIR_PUBLIC, 'meta')

export async function ensureDirs() {
  await mkdir(OUT_DIR_META, { recursive: true })
}
