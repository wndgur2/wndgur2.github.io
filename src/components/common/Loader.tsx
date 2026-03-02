import type { FunctionComponent } from 'react'

import './Loader.css'

interface LoadingProps {
  phrase?: string
}

const Loader: FunctionComponent<LoadingProps> = ({ phrase }) => {
  return (
    <div className='spinner-wrapper'>
      <div className='loader' />
      <span className='minor'>{phrase}</span>
    </div>
  )
}

export default Loader
