import './Loader.css'

interface Props {
  phrase?: string
}

export default function Loader({ phrase }: Props) {
  return (
    <div className='spinner-wrapper'>
      <div className='loader' />
      <span className='minor'>{phrase}</span>
    </div>
  )
}
