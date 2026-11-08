import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Spinner from '@/components/common/Spinner'

const DefaultLayout = lazy(() => import('@/layouts/DefaultLayout'))
const PostDetailLayout = lazy(
  () => import('@/layouts/PostDetailLayout/PostDetailLayout'),
)
const HomePage = lazy(() => import('@/pages/HomePage'))
const KnowledgeGraphPage = lazy(() => import('@/pages/KnowledgeGraphPage'))
const NoPage = lazy(() => import('@/pages/NoPage'))
const PostDetailPage = lazy(() => import('@/pages/PostDetailPage'))
const SearchResultPage = lazy(() => import('@/pages/SearchResultPage'))

export const ROUTES = {
  HOME: '/',
  SEARCH: (searchKey: string) => `/search/${searchKey}`,
  POST_DETAIL: (id: string) => `/post/${id}`,
  GRAPH: '/graph',
}

export const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<Spinner phrase='페이지 로딩중...' />}>
        <DefaultLayout />
      </Suspense>
    ),
    children: [
      {
        path: ROUTES.HOME,
        element: (
          <Suspense fallback={<Spinner phrase='페이지 로딩중...' />}>
            <HomePage />
          </Suspense>
        ),
        index: true,
      }, // Default child route for the root path
      {
        path: ROUTES.SEARCH(':searchKey'),
        element: (
          <Suspense fallback={<Spinner phrase='검색 결과 로딩중...' />}>
            <SearchResultPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.SEARCH(''),
        element: (
          <Suspense fallback={<Spinner phrase='검색 결과 로딩중...' />}>
            <SearchResultPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.POST_DETAIL(':id'),
        element: (
          <Suspense fallback={<Spinner phrase='게시글 로딩중...' />}>
            <PostDetailLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Spinner phrase='게시글 로딩중...' />}>
                <PostDetailPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: ROUTES.GRAPH,
        element: (
          <Suspense fallback={<Spinner phrase='그래프 로딩중...' />}>
            <KnowledgeGraphPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<Spinner phrase='페이지 로딩중...' />}>
            <NoPage />
          </Suspense>
        ),
      },
    ],
  },
])
