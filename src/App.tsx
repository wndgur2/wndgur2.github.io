import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { DeviceContext } from '@/contexts/Device'
import usePosts from '@/hooks/usePosts'
import SearchResult from '@/pages/Search/SearchResult'
import NoPage from '@/pages/NoPage'
import Layout from '@/pages/Layouts/Layout'
import Home from '@/pages/Home/Home'
import Post from '@/pages/Post/PostDetail'

export default function App() {
  const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'light' ? false : true)
  usePosts()
  useEffect(() => {
    const link = document.querySelector('link[rel="icon"]')
    if (!link) return

    link.setAttribute('href', `/favicon-${isDark ? 'dark' : 'light'}.ico`)
  }, [isDark])

  return (
    <BrowserRouter>
      <DeviceContext.Provider value={{ isDark, setIsDark }}>
        <Routes>
          <Route
            path="/"
            element={<Layout />}
          >
            <Route
              index
              element={<Home />}
            />
            <Route
              path="/search/:search_text"
              element={<SearchResult />}
            />
            <Route
              path="/post/:post_title"
              element={<Post />}
            />
            <Route
              path="*"
              element={<NoPage />}
            />
          </Route>
        </Routes>
      </DeviceContext.Provider>
    </BrowserRouter>
  )
}
