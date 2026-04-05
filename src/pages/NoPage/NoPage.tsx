import { ROUTES } from '@/router'

import './NoPage.css'

import { Link } from 'react-router-dom'

/**
 * 준비 중이거나 없는 페이지 fallback 컴포넌트
 */
export default function NoPage() {
  return (
    <div className='no-page-container'>
      <h2>없는 페이지입니다. (404)</h2>
      <Link to={ROUTES.HOME}>홈으로</Link>
    </div>
  )
}
