import './Spinner.css'

interface Props {
  phrase?: string
}

export default function Spinner({ phrase }: Props) {
  return (
    <div className='spinner-wrapper'>
      <div className='spinner' />
      <span className='minor'>{phrase}</span>
    </div>
  )
}
