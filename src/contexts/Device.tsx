import { createContext } from 'react'

export const DeviceContext = createContext({
  isDark: false,
  setIsDark: (_isDark: boolean) => {},
})
