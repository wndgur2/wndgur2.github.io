import { createContext, useEffect, useState } from 'react'

interface IThemeContext {
  isDark: boolean
  setIsDark: (_isDark: boolean) => void
}

export const ThemeContext = createContext<IThemeContext>({
  isDark: false,
  setIsDark: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(
    localStorage.getItem('theme') !== 'light',
  )

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
