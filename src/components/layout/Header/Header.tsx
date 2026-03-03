import { useEffect, useRef, useState } from 'react'

import Logo from '@/assets/logo.svg?react'

import './Header.css'

import { Link } from 'react-router-dom'

import useTheme from '@/hooks/useTheme'
import { ROUTES } from '@/router'
import SearchBar from '../SearchBar'
import ThemeToggler from '../ThemeToggler'

/**
 * 헤더 컴포넌트
 * - 로고/검색바/테마 토글 제공
 * - 스크롤 방향에 따라 헤더 상태(top/hide) 변경
 */
export default function Header() {
  const { isDark, setIsDark } = useTheme()
  const headerRef = useRef<HTMLDivElement>(null)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    // 스크롤 위치를 비교해 헤더 노출 상태 제어
    let lastScrollTop = 0
    window.addEventListener('scroll', () => {
      if (!headerRef.current) return
      const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop
      if (currentScroll > 0 && currentScroll > lastScrollTop) {
        setIsHidden(true)
      } else {
        setIsHidden(false)
      }
      lastScrollTop = currentScroll
    })

    return () => {
      window.removeEventListener('scroll', () => {})
    }
  }, [])

  return (
    <div id='header' ref={headerRef} className={isHidden ? 'hide' : 'top'}>
      <Link to={ROUTES.HOME} className='logo clickable small'>
        <Logo />
      </Link>
      <SearchBar />
      <ThemeToggler
        isChecked={isDark}
        handleChange={() => {
          setIsDark(!isDark)
        }}
      />
    </div>
  )
}
