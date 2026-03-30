import { createBrowserRouter } from 'react-router-dom'

import DefaultLayout from './layouts/DefaultLayout'
import PostDetailLayout from './layouts/PostDetailLayout/PostDetailLayout'
import HomePage from './pages/HomePage'
import NoPage from './pages/NoPage'
import PostDetailPage from './pages/PostDetailPage'
import SearchResultPage from './pages/SearchResultPage'

export const ROUTES = {
  HOME: '/',
  SEARCH: (searchKey: string) => `/search/${searchKey}`,
  POST_DETAIL: (id: string) => `/post/${id}`,
}

export const router = createBrowserRouter([
  {
    Component: () => <DefaultLayout />,
    children: [
      { path: ROUTES.HOME, element: <HomePage />, index: true }, // Default child route for the root path
      { path: ROUTES.SEARCH(':searchKey'), element: <SearchResultPage /> },
      { path: ROUTES.SEARCH(''), element: <SearchResultPage /> },
      {
        path: ROUTES.POST_DETAIL(':id'),
        Component: () => <PostDetailLayout />,
        children: [{ index: true, element: <PostDetailPage /> }],
      },
      { path: '*', element: <NoPage /> },
    ],
  },
])
