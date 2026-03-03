import { createContext, useEffect, useState } from 'react'

interface ThemeContextType {
  isDark: boolean
  setIsDark: (_isDark: boolean) => void
}

const themeContext = createContext<ThemeContextType | null>(null)

export const ThemeContext = themeContext

/**
 * 테마 컨텍스트 프로바이더 컴포넌트
 * - 다크/라이트 상태 전역 관리
 * - 로컬 스토리지 및 파비콘 동기화
 *
 * @param children ThemeContext로 감쌀 하위 컴포넌트
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(
    localStorage.getItem('theme') !== 'light',
  )

  // 테마 변경 시 저장소와 파비콘을 현재 모드로 갱신
  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')

    const link = document.querySelector('link[rel="icon"]')
    if (!link) return
    link.setAttribute('href', `/favicon-${isDark ? 'dark' : 'light'}.ico`)
  }, [isDark])

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  )
}
