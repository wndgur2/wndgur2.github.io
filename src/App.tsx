import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import Home from '@/pages/Home/Home'
import Layout from '@/pages/Layouts/Layout'
import NoPage from '@/pages/NoPage'
import Post from '@/pages/PostDetail/PostDetail'
import SearchResult from '@/pages/Search/SearchResult'
import { postsAtom } from '@/recoil/atoms/postsAtom'
import { getPosts, getProjects } from './api/post'
import ThemeProvider from './contexts/ThemeProvider'

const routes = [
  { path: '/', element: <Home />, index: true }, // Default child route for the root path
  { path: '/search/:searchKey', element: <SearchResult /> },
  { path: '/post/:title', element: <Post /> },
  { path: '*', element: <NoPage /> },
]

export default function App() {
  const setPosts = useSetRecoilState(postsAtom)

  useEffect(() => {
    getPosts(setPosts)
    getProjects(setPosts)
  }, [setPosts])

  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            {routes.map(({ path, element, index }) => (
              <Route key={path} path={path} element={element} index={index} />
            ))}
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}
