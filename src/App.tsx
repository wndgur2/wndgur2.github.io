import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { DeviceContext } from '@/contexts/Device'
import usePosts from '@/hooks/usePosts'
import SearchResult from '@/pages/Search/SearchResult'
import NoPage from '@/pages/NoPage'
import Layout from '@/pages/Layouts/Layout'
import Home from '@/pages/Home/Home'
import Post from '@/pages/PostDetail/PostDetail'

// Custom hook to manage theme
function useTheme() {
  const [isDark, setIsDark] = useState(localStorage.getItem('theme') !== 'light')

  useEffect(() => {
    const link = document.querySelector('link[rel="icon"]')
    if (!link) return
    link.setAttribute('href', `/favicon-${isDark ? 'dark' : 'light'}.ico`)
  }, [isDark])

  return { isDark, setIsDark }
}

const routes = [
  { path: '/', element: <Home />, index: true }, // Default child route for the root path
  { path: '/search/:search_text', element: <SearchResult /> },
  { path: '/post/:post_title', element: <Post /> },
  { path: '*', element: <NoPage /> },
]

export default function App() {
  const { isDark, setIsDark } = useTheme()
  usePosts()

  return (
    <BrowserRouter>
      <DeviceContext.Provider value={{ isDark, setIsDark }}>
        <Routes>
          <Route
            path="/"
            element={<Layout />}
          >
            {routes.map(({ path, element, index }) => (
              <Route
                key={path}
                path={path}
                element={element}
                index={index}
              />
            ))}
          </Route>
        </Routes>
      </DeviceContext.Provider>
    </BrowserRouter>
  )
}
