import { createContext, useCallback, useEffect, useLayoutEffect, useState } from 'react'

import {
  getStoredTheme,
  getSystemTheme,
  storeTheme,
  subscribeSystemTheme,
  type Theme,
} from '@/utils/theme'

interface ThemeContextType {
  isDark: boolean
  setIsDark: (_isDark: boolean) => void
}

const themeContext = createContext<ThemeContextType | null>(null)

export const ThemeContext = themeContext

/**
 * 테마 컨텍스트 프로바이더 컴포넌트
 * - 다크/라이트 상태 전역 관리
 * - 사용자가 고른 테마가 없으면 시스템 설정을 따른다
 * - html의 data-theme, 로컬 스토리지, 파비콘 동기화
 *
 * @param children ThemeContext로 감쌀 하위 컴포넌트
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [storedTheme, setStoredTheme] = useState<Theme | null>(getStoredTheme)
  const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme)
  const theme = storedTheme ?? systemTheme
  const isDark = theme === 'dark'

  useEffect(() => subscribeSystemTheme(setSystemTheme), [])

  // 페인트 전에 적용해야 토글할 때 이전 테마가 한 프레임 보이지 않는다.
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme

    const link = document.querySelector('link[rel="icon"]')
    if (!link) return
    link.setAttribute('href', `/favicon-${theme}.ico`)
  }, [theme])

  // 사용자가 직접 고른 값만 저장해서, 고르기 전에는 시스템 설정을 계속 따른다.
  const setIsDark = useCallback((nextIsDark: boolean) => {
    const nextTheme: Theme = nextIsDark ? 'dark' : 'light'
    storeTheme(nextTheme)
    setStoredTheme(nextTheme)
  }, [])

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  )
}
