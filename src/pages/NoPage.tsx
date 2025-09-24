import { type FunctionComponent } from 'react'

import './NoPage.css'

import { Link } from 'react-router-dom'

interface NoPageProps {}

const NoPage: FunctionComponent<NoPageProps> = () => {
  return (
    <div className='no-page-container'>
      <h2>페이지가 개발중이에요.</h2>
      <Link to={'/'}>홈으로</Link>
    </div>
  )
}

export default NoPage
