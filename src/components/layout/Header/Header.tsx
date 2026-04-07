import { useEffect, useRef, useState } from 'react'

import Logo from '@/assets/logo.svg?react'
import useTheme from '@/hooks/useTheme'
import { ROUTES } from '@/router'
import { Link } from 'react-router-dom'

import SearchBar from '@/components/layout/SearchBar'
import ThemeToggler from '@/components/layout/ThemeToggler'
import styles from './Header.module.css'

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
    const handleScroll = () => {
      if (!headerRef.current) return
      const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop
      if (currentScroll > 0 && currentScroll > lastScrollTop) {
        setIsHidden(true)
      } else {
        setIsHidden(false)
      }
      lastScrollTop = currentScroll
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      ref={headerRef}
      className={`${styles.header} ${isHidden ? styles.hide : styles.top}`}
    >
      <Link to={ROUTES.HOME} className={`${styles.logo} clickable small`}>
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
