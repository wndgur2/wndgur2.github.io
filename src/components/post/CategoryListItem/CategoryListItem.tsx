import { useRef, useState } from 'react'

import './CategoryListItem.css'

import { IoIosArrowForward } from 'react-icons/io'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

import CATEGORIES from '@/consts/CATEGORIES'
import { usePostsByCategory } from '@/hooks/usePosts'
import { ROUTES } from '@/router'
import PostListItem from '@/components/post/PostListItem'
import ProjectListItem from '@/components/post/ProjectListItem'

/**
 * 홈 카테고리 섹션 컴포넌트
 * - 카테고리 헤더 및 더보기 링크 제공
 * - 게시글 목록 가로 스크롤 및 버튼 제어
 *
 * @param category 카테고리 식별값
 * @param label 화면에 표시할 카테고리명
 * @param children 카테고리 내부에 렌더링할 게시글 목록 요소
 */

interface Props {
  category: (typeof CATEGORIES)[keyof typeof CATEGORIES]
}

export default function CategoryListItem({ category }: Props) {
  const postsRef = useRef<HTMLUListElement>(null)
  const [isBackwardDisabled, setIsBackwardDisabled] = useState(true)
  const [isForwardDisabled, setIsForwardDisabled] = useState(false)

  const posts = usePostsByCategory(category, 10)

  const scroll = (direction: 'backward' | 'forward') => {
    if (postsRef.current) {
      postsRef.current.scrollBy({
        left: direction === 'backward' ? -600 : 600,
        behavior: 'smooth',
      })
    }
  }
  const updateScrollButtons = () => {
    if (!postsRef.current) return
    if (postsRef.current.scrollLeft === 0) {
      setIsBackwardDisabled(true)
    } else {
      setIsBackwardDisabled(false)
    }

    if (
      postsRef.current.scrollLeft +
        postsRef.current.getBoundingClientRect().width >=
      postsRef.current.scrollWidth * 0.99
    ) {
      setIsForwardDisabled(true)
    } else {
      setIsForwardDisabled(false)
    }
  }

  const label =
    category === CATEGORIES.PROJECT
      ? 'Projects'
      : category === CATEGORIES.STUDY
        ? 'Studies'
        : category === CATEGORIES.ALGORITHM
          ? 'Algorithms'
          : ''

  return (
    <section className='home-category'>
      <header>
        <Link className='link' to={ROUTES.SEARCH(`@${category}`)}>
          <header>
            <h1>{label}</h1>
            <IoIosArrowForward size={20} />
          </header>
        </Link>
        <div className='scroll-buttons'>
          <button
            className='small clickable'
            onClick={() => scroll('backward')}
            disabled={isBackwardDisabled}
          >
            <RiArrowLeftSLine size={26} />
          </button>
          <button
            className='small clickable'
            onClick={() => scroll('forward')}
            disabled={isForwardDisabled}
          >
            <RiArrowRightSLine size={26} />
          </button>
        </div>
      </header>
      <ul className='posts' ref={postsRef} onScroll={updateScrollButtons}>
        {posts.map(post =>
          category === CATEGORIES.PROJECT ? (
            <ProjectListItem key={post.id} post={post} />
          ) : (
            <PostListItem key={post.id} post={post} />
          ),
        )}
      </ul>
    </section>
  )
}
