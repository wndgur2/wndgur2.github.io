import './Spinner.css'

/**
 * 로딩 스피너 컴포넌트
 * - 로딩 중임을 시각적으로 표시하는 애니메이션 요소
 *
 * @param phrase 로딩 중 표시할 문구 (선택적)
 */

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
