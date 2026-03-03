import { useEffect, useRef } from 'react'

import './HomeCategory.css'

import { IoIosArrowForward } from 'react-icons/io'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

import type CATEGORIES from '@/consts/CATEGORIES'
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
  label: string
  category: (typeof CATEGORIES)[keyof typeof CATEGORIES]
  children: React.ReactNode
}

export default function HomeCategory({ category, label, children }: Props) {
  const postsRef = useRef<HTMLUListElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  // 좌/우 버튼 클릭 시 게시글 리스트를 일정 거리만큼 스크롤
  const scrollPosts = (direction: 'backward' | 'forward') => {
    if (postsRef.current) {
      postsRef.current.scrollBy({
        left: direction === 'backward' ? -600 : 600,
        behavior: 'smooth',
      })
    }
  }

  // 현재 스크롤 위치를 기준으로 좌/우 버튼 활성화 상태 변경
  const changeScrollButtons = () => {
    if (!postsRef.current) return
    if (!buttonsRef.current) return
    if (postsRef.current.scrollLeft === 0)
      buttonsRef.current
        .querySelector('button:first-child')
        ?.setAttribute('disabled', 'true')
    else
      buttonsRef.current
        .querySelector('button:first-child')
        ?.removeAttribute('disabled')

    if (
      postsRef.current.scrollLeft +
        postsRef.current.getBoundingClientRect().width >=
      postsRef.current.scrollWidth * 0.99
    )
      buttonsRef.current
        .querySelector('button:last-child')
        ?.setAttribute('disabled', 'true')
    else
      buttonsRef.current
        .querySelector('button:last-child')
        ?.removeAttribute('disabled')
  }

  // 목록 변경 시 스크롤 버튼 상태 초기 동기화
  useEffect(() => {
    changeScrollButtons()
  }, [children])

  return (
    <section className='home-category'>
      <header>
        <Link className='link' to={ROUTES.SEARCH(`@${category}`)}>
          <header>
            <h1>{label}</h1>
            <IoIosArrowForward size={20} />
          </header>
        </Link>
        <div className='scroll-buttons' ref={buttonsRef}>
          <button className='icon' onClick={() => scrollPosts('backward')}>
            <RiArrowLeftSLine size={26} />
          </button>
          <button className='icon' onClick={() => scrollPosts('forward')}>
            <RiArrowRightSLine size={26} />
          </button>
        </div>
      </header>
      <ul className='posts' ref={postsRef} onScroll={changeScrollButtons}>
        {children}
      </ul>
    </section>
  )
}
