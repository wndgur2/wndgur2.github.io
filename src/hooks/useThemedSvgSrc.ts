import { useEffect, useState } from 'react'

const DARK_QUERY = /@media\s*\(\s*prefers-color-scheme\s*:\s*dark\s*\)/g

/**
 * SVG 안의 `prefers-color-scheme: dark` 블록을 블로그 테마에 맞춰 켜거나 끈다.
 * <img>로 넣은 SVG는 OS 설정만 보므로, 블로그 토글과 OS 설정이 다르면 색이 어긋난다.
 */
export function themeSvg(text: string, isDark: boolean) {
  return text.replace(DARK_QUERY, isDark ? '@media all' : '@media not all')
}

const textCache = new Map<string, Promise<string>>()

function loadText(src: string) {
  let pending = textCache.get(src)
  if (!pending) {
    pending = fetch(src).then(res => {
      if (!res.ok) throw new Error(`Failed to load ${src}`)
      return res.text()
    })
    textCache.set(src, pending)
  }
  return pending
}

const isOwnSvg = (src: string) => /^\/[^/].*\.svg(\?.*)?$/i.test(src)

/**
 * 블로그에 올린 SVG(`/images/...svg`)를 현재 테마로 고친 blob URL을 돌려준다.
 * - 다른 이미지는 그대로 돌려준다.
 * - 준비되는 동안은 빈 문자열을 돌려줘 원본 색이 잠깐 보이지 않게 하고, 실패하면 원본을 쓴다.
 */
export default function useThemedSvgSrc(
  src: string | undefined,
  isDark: boolean,
) {
  const themable = !!src && isOwnSvg(src)
  const [state, setState] = useState<{ key: string; url: string } | null>(null)
  const key = `${src}|${isDark}`

  useEffect(() => {
    if (!themable || !src) return
    let cancelled = false
    let objectUrl: string | undefined

    loadText(src)
      .then(text => {
        if (cancelled) return
        objectUrl = URL.createObjectURL(
          new Blob([themeSvg(text, isDark)], { type: 'image/svg+xml' }),
        )
        setState({ key, url: objectUrl })
      })
      .catch(() => {
        if (!cancelled) setState({ key, url: src })
      })

    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [themable, src, isDark, key])

  if (!themable) return src
  return state?.key === key ? state.url : ''
}
