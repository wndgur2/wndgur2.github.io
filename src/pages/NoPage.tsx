import './NoPage.css'

import { Link } from 'react-router-dom'

export default function NoPage() {
  return (
    <div className='no-page-container'>
      <h2>페이지가 개발중이에요.</h2>
      <Link to={'/'}>홈으로</Link>
    </div>
  )
}
