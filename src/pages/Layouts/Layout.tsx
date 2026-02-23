import { Outlet } from 'react-router-dom'

import Header from './Header/Header'

import './Layout.css'

import { useContext } from 'react'

import { ThemeContext } from '@/contexts/ThemeProvider'
import Footer from './Footer/Footer'

interface LayoutProps {}

export default function Layout(_props: LayoutProps) {
  const { isDark } = useContext(ThemeContext)
  return (
    <div id='container' data-theme={isDark ? 'dark' : 'light'}>
      <Header />
      <div id='body-container'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
