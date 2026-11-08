import { Outlet } from 'react-router-dom'

import styles from './DefaultLayout.module.css'

import SkipLink from '@/components/common/SkipLink'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'

const MAIN_CONTENT_ID = 'main-content'

/**
 * 기본 레이아웃 컴포넌트
 * - 본문 건너뛰기 링크와 공통 헤더/푸터 배치
 * - 라우트별 본문(Outlet) 렌더링
 */
export default function DefaultLayout() {
  return (
    <div className={styles.container}>
      <SkipLink targetId={MAIN_CONTENT_ID}>본문으로 건너뛰기</SkipLink>
      <Header />
      <div id={MAIN_CONTENT_ID} tabIndex={-1} className={styles.bodyContainer}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
