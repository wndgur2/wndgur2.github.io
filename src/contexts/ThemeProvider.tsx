import { createContext, useEffect, useState } from 'react'

interface ThemeContextType {
  isDark: boolean
  setIsDark: (_isDark: boolean) => void
}

const themeContext = createContext<ThemeContextType | null>(null)

export const ThemeContext = themeContext

function ThemeProvider({ children }: { children: React.ReactNode }) {
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

export default ThemeProvider
