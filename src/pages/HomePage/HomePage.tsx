import './HomePage.css'

import { Suspense } from 'react'

import Spinner from '@/components/common/Spinner'
import CategoryList from '@/components/post/CategoryList'
import Profile from '@/components/profile/Profile'
import useRestoreLostUrl from '@/hooks/useRestoreLostUrl'

/**
 * 홈 페이지 컴포넌트
 * - 전체 게시글을 카테고리별로 분리해서 노출
 * - 각 카테고리의 최신 목록을 가로 스크롤 형태로 제공
 */
export default function HomePage() {
  useRestoreLostUrl()

  return (
    <div id='home'>
      <Profile />

      <Suspense fallback={<Spinner phrase='게시글 로딩중...' />}>
        <CategoryList />
      </Suspense>
    </div>
  )
}
