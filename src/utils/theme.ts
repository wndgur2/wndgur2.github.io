export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'theme'

const DARK_QUERY = '(prefers-color-scheme: dark)'

/**
 * 사용자가 토글로 고른 테마. 고른 적이 없거나 저장소를 쓸 수 없으면 null이다.
 * index.html의 인라인 스크립트도 같은 규칙으로 첫 테마를 정한다.
 */
export function getStoredTheme(): Theme | null {
  try {
    const theme = localStorage.getItem(THEME_STORAGE_KEY)
    return theme === 'light' || theme === 'dark' ? theme : null
  } catch {
    return null
  }
}

export function storeTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // 저장하지 못해도 현재 화면의 테마는 바뀐다.
  }
}

export function getSystemTheme(): Theme {
  if (typeof window.matchMedia !== 'function') return 'light'
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light'
}

/** 시스템 테마가 바뀌면 콜백을 부르고, 구독 해제 함수를 돌려준다. */
export function subscribeSystemTheme(callback: (_theme: Theme) => void) {
  if (typeof window.matchMedia !== 'function') return () => {}
  const query = window.matchMedia(DARK_QUERY)
  const handleChange = (e: MediaQueryListEvent) => {
    callback(e.matches ? 'dark' : 'light')
  }
  query.addEventListener('change', handleChange)
  return () => query.removeEventListener('change', handleChange)
}
