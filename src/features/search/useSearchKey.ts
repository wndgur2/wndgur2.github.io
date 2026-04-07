import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

function decodeSearchKey(raw: string | undefined): string {
  if (!raw) return ''

  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}

export default function useSearchKey() {
  const { searchKey } = useParams()

  return useMemo(() => decodeSearchKey(searchKey), [searchKey])
}
