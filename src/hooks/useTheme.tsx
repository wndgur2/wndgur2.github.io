import { useContext } from 'react'

import { ThemeContext } from '@/contexts/ThemeProvider'

export default function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useModal must be used within ModalProvider')
  }
  return ctx
}
