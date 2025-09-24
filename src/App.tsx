import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DeviceContext } from '@/contexts/Device'
import SearchResult from '@/pages/Search/SearchResult'
import NoPage from '@/pages/NoPage'
import Layout from '@/pages/Layouts/Layout'
import Home from '@/pages/Home/Home'
import Post from '@/pages/PostDetail/PostDetail'
import useTheme from './hooks/useTheme'
import { useSetRecoilState } from 'recoil'
import { useEffect } from 'react'
import { getPosts, getProjects } from './api/post'
import { postsAtom } from '@/recoil/atoms/postsAtom'

const routes = [
  { path: '/', element: <Home />, index: true }, // Default child route for the root path
  { path: '/search/:searchKey', element: <SearchResult /> },
  { path: '/post/:title', element: <Post /> },
  { path: '*', element: <NoPage /> },
]

export default function App() {
  const { isDark, setIsDark } = useTheme()
  const setPosts = useSetRecoilState(postsAtom)

  useEffect(() => {
    getPosts(setPosts)
    getProjects(setPosts)
  }, [setPosts])

  return (
    <BrowserRouter>
      <DeviceContext.Provider value={{ isDark, setIsDark }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {routes.map(({ path, element, index }) => (
              <Route key={path} path={path} element={element} index={index} />
            ))}
          </Route>
        </Routes>
      </DeviceContext.Provider>
    </BrowserRouter>
  )
}
