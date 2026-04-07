import { Outlet } from 'react-router-dom'

import './DefaultLayout.css'

import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import useTheme from '@/hooks/useTheme'

/**
 * 기본 레이아웃 컴포넌트
 * - 공통 헤더/푸터 배치
 * - 라우트별 본문(Outlet) 렌더링
 * - 테마 속성을 컨테이너에 적용
 */
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
