import './Loading.css'

interface LoadingProps {
  phrase?: string
}

export default function Loading({ phrase }: LoadingProps) {
  return (
    <div className='spinner-wrapper'>
      <div className='spinner' />
      <span className='minor'>{phrase}</span>
    </div>
  )
}
