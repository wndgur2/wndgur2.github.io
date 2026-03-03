import { createBrowserRouter } from 'react-router-dom'

import DefaultLayout from './layouts/DefaultLayout'
import HomePage from './pages/HomePage'
import NoPage from './pages/NoPage'
import PostDetailPage from './pages/PostDetailPage'
import SearchResultPage from './pages/SearchResultPage'

export const routes = createBrowserRouter([
  {
    Component: () => <DefaultLayout />,
    children: [
      { path: '/', element: <HomePage />, index: true }, // Default child route for the root path
      { path: '/search/:searchKey', element: <SearchResultPage /> },
      { path: '/post/:title', element: <PostDetailPage /> },
      { path: '*', element: <NoPage /> },
    ],
  },
])
