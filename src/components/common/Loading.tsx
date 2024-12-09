import { FunctionComponent } from 'react'
import './Loading.css'

interface LoadingProps {
  phrase?: string
}

const Loading: FunctionComponent<LoadingProps> = ({ phrase }) => {

  return (
    <div className='spinner-wrapper'>
      <div className='spinner' />
      <span className='minor'>
        { phrase }
      </span>
    </div>
  )
}

export default Loading
