import { useRef } from 'react'

import Logo from '@/assets/logo.svg?react'

import './Header.css'

import { Link } from 'react-router-dom'

import useTheme from '@/hooks/useTheme'
import { ROUTES } from '@/router'
import SearchBar from '../SearchBar'
import ThemeToggler from '../ThemeToggler'

export default function Header() {
  const { isDark, setIsDark } = useTheme()
  const headerRef = useRef<HTMLDivElement>(null)

  // hide header when scrolling down
  let lastScrollTop = 0
  window.addEventListener('scroll', () => {
    if (!headerRef.current) return
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop
    if (currentScroll > 0 && currentScroll > lastScrollTop) {
      headerRef.current.classList.remove('top')
    } else if (currentScroll === 0) {
      headerRef.current.classList.remove('hide')
      headerRef.current.classList.add('top')
    } else {
      headerRef.current.classList.remove('hide')
      headerRef.current.classList.remove('top')
    }
    lastScrollTop = currentScroll
  })

  return (
    <div id='header' ref={headerRef}>
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
