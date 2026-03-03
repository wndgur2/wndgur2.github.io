import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from './contexts/ThemeProvider'
import usePosts from './hooks/usePosts'
import { router } from './router'

export default function App() {
  usePosts()

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
