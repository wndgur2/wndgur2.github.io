import { Outlet } from 'react-router-dom'

import Header from '../../components/layout/Header'

import './DefaultLayout.css'

import useTheme from '@/hooks/useTheme'
import Footer from '../../components/layout/Footer'

export default function DefaultLayout() {
  const { isDark } = useTheme()
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
