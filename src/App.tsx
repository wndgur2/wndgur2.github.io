import { BrowserRouter, RouterProvider } from 'react-router-dom'

import { ThemeProvider } from './contexts/ThemeProvider'
import usePosts from './hooks/usePosts'
import { routes } from './routes'

export default function App() {
  usePosts()

  return (
    <BrowserRouter>
      <ThemeProvider>
        <RouterProvider router={routes} />
      </ThemeProvider>
    </BrowserRouter>
  )
}
