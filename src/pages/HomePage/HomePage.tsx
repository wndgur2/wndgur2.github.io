import './HomePage.css'

import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import Loading from '@/components/common/Spinner'
import PostListItem from '@/components/post/PostListItem'
import ProjectListItem from '@/components/post/ProjectListItem'
import Profile from '@/components/profile/Profile'
import CATEGORIES from '@/consts/CATEGORIES'
import usePostsByCategory from '@/hooks/usePostsByCategory'
import useRestoreLostUrl from '@/hooks/useRestoreLostUrl'
import { postsAtom } from '@/store'
import { searchKeyAtom } from '@/store/atoms/searchAtom'
import type { IPost } from '@/types'
import HomeCategory from '../../components/post/HomeCategory'

/**
 * 홈 페이지 컴포넌트
 * - 전체 게시글을 카테고리별로 분리해서 노출
 * - 각 카테고리의 최신 목록을 가로 스크롤 형태로 제공
 */
export default function HomePage() {
  useRestoreLostUrl()

  // 검색어 초기화
  const setSearchKey = useSetRecoilState(searchKeyAtom)
  useEffect(() => {
    setSearchKey('')
  }, [setSearchKey])

  // 카테고리별 게시글 10개 추출
  const posts = useRecoilValue(postsAtom)
  const { projects, algorithms, studies } = usePostsByCategory(posts, 10)

  return (
    <div id='home'>
      <Profile />
      <main>
        <HomeCategory label='Projects' category={CATEGORIES.PROJECT}>
          {projects.length > 0 ? (
            projects.map((project: IPost) => (
              <ProjectListItem key={project.id} post={project} />
            ))
          ) : (
            <Loading phrase='loading projects' />
          )}
        </HomeCategory>

        <HomeCategory label='Studies' category={CATEGORIES.STUDY}>
          {studies.length ? (
            studies.map((post: IPost) => (
              <PostListItem key={post.id} post={post} />
            ))
          ) : (
            <Loading phrase={`loading studies`} />
          )}
        </HomeCategory>

        <HomeCategory label='Algorithms' category={CATEGORIES.ALGORITHM}>
          {algorithms.length ? (
            algorithms.map((post: IPost) => (
              <PostListItem key={post.id} post={post} />
            ))
          ) : (
            <Loading phrase={`loading algorithms`} />
          )}
        </HomeCategory>
      </main>
    </div>
  )
}
