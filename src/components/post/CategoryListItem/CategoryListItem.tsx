import { useEffect, useRef, useState } from 'react'

import styles from './CategoryListItem.module.css'

import { IoIosArrowForward } from 'react-icons/io'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

import IconButton from '@/components/common/IconButton'
import PostListItem from '@/components/post/PostListItem'
import ProjectListItem from '@/components/post/ProjectListItem'
import CATEGORIES from '@/consts/CATEGORIES'
import { usePostsByCategory } from '@/hooks/usePosts'
import { ROUTES } from '@/router'

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
  const backwardRef = useRef<HTMLButtonElement>(null)
  const forwardRef = useRef<HTMLButtonElement>(null)
  // 비활성이 되는 버튼에 포커스가 있었다면, 렌더 후 반대쪽 버튼으로 옮긴다.
  const pendingFocusRef = useRef<HTMLButtonElement | null>(null)
  const [isBackwardDisabled, setIsBackwardDisabled] = useState(true)
  const [isForwardDisabled, setIsForwardDisabled] = useState(false)

  const posts = usePostsByCategory(category, 6)

  useEffect(() => {
    const target = pendingFocusRef.current
    pendingFocusRef.current = null
    if (target && !target.disabled) target.focus()
  }, [isBackwardDisabled, isForwardDisabled])

  const scroll = (direction: 'backward' | 'forward') => {
    if (postsRef.current) {
      const reduceMotion = window.matchMedia?.(
        '(prefers-reduced-motion: reduce)',
      ).matches
      postsRef.current.scrollBy({
        left: direction === 'backward' ? -600 : 600,
        behavior: reduceMotion ? 'auto' : 'smooth',
      })
    }
  }
  const updateScrollButtons = () => {
    if (!postsRef.current) return
    const { scrollLeft, clientWidth, scrollWidth } = postsRef.current
    const nextBackwardDisabled = scrollLeft === 0
    const nextForwardDisabled = scrollLeft + clientWidth >= scrollWidth * 0.99

    // 비활성 버튼은 포커스를 잃고 body로 떨어지므로 미리 옮길 곳을 정한다.
    const focused = document.activeElement
    if (nextForwardDisabled && focused === forwardRef.current) {
      pendingFocusRef.current = backwardRef.current
    } else if (nextBackwardDisabled && focused === backwardRef.current) {
      pendingFocusRef.current = forwardRef.current
    }

    setIsBackwardDisabled(nextBackwardDisabled)
    setIsForwardDisabled(nextForwardDisabled)
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
    <section className={styles.homeCategory}>
      <header>
        <Link className={`${styles.categoryLink} link`} to={ROUTES.SEARCH(`@${category}`)}>
          <header>
            <h1>{label}</h1>
            <IoIosArrowForward size={20} />
          </header>
        </Link>
        <div className={styles.scrollButtons}>
          <IconButton
            label={`${label} 이전 목록`}
            className={`${styles.scrollButton} small clickable icon`}
            onClick={() => scroll('backward')}
            disabled={isBackwardDisabled}
            ref={backwardRef}
          >
            <RiArrowLeftSLine size={26} />
          </IconButton>
          <IconButton
            label={`${label} 다음 목록`}
            className={`${styles.scrollButton} small clickable icon`}
            onClick={() => scroll('forward')}
            disabled={isForwardDisabled}
            ref={forwardRef}
          >
            <RiArrowRightSLine size={26} />
          </IconButton>
        </div>
      </header>
      <ul className={styles.posts} ref={postsRef} onScroll={updateScrollButtons}>
        {posts.map(post =>
          category === CATEGORIES.PROJECT ? (
            <ProjectListItem
              key={post.id}
              post={post}
              className={styles.postItem}
            />
          ) : (
            <PostListItem
              key={post.id}
              post={post}
              className={styles.postItem}
            />
          ),
        )}
      </ul>
    </section>
  )
}
