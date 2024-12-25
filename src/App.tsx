import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DeviceContext } from '@/contexts/Device'
import usePosts from '@/hooks/usePosts'
import SearchResult from '@/pages/Search/SearchResult'
import NoPage from '@/pages/NoPage'
import Layout from '@/pages/Layouts/Layout'
import Home from '@/pages/Home/Home'
import Post from '@/pages/PostDetail/PostDetail'
import useTheme from './hooks/useTheme'

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
