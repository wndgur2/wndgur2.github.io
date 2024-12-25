import { useEffect, useState } from 'react'

export default function useTheme() {
  const [isDark, setIsDark] = useState(localStorage.getItem('theme') !== 'light')

  useEffect(() => {
    const link = document.querySelector('link[rel="icon"]')
    if (!link) return
    link.setAttribute('href', `/favicon-${isDark ? 'dark' : 'light'}.ico`)
  }, [isDark])

  return { isDark, setIsDark }
}
