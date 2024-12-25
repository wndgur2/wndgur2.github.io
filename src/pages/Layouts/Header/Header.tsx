import { FunctionComponent, useContext, useRef } from 'react'
import { ReactComponent as Logo } from '@/assets/logo.svg'
import './Header.css'
import ThemeToggler from './Theme/ThemeToggler'
import SearchBar from './SearchBar/SearchBar'
import { DeviceContext } from '../../../contexts/Device'
import { Link } from 'react-router-dom'
import Spacer from '@/components/common/Spacer'

const Header: FunctionComponent = () => {
  const { isDark, setIsDark } = useContext(DeviceContext)
  const headerRef = useRef<HTMLDivElement>(null)

  // hide header when scrolling down
  let lastScrollTop = 0
  window.addEventListener('scroll', () => {
    if (!headerRef.current) return
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop
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
    <div
      id="header"
      ref={headerRef}
    >
      <Link
        to={'/'}
        className="logo clickable small"
      >
        <Logo />
      </Link>
      <Spacer />
      <SearchBar />
      <Spacer />
      <ThemeToggler
        isChecked={isDark}
        handleChange={() => {
          setIsDark(!isDark)
          localStorage.setItem('theme', isDark ? 'light' : 'dark')
        }}
      />
    </div>
  )
}

export default Header
