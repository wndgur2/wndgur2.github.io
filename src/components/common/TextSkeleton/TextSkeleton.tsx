import './TextSkeleton.css'

interface Props {
  lines?: number
  width?: string | number
  height?: string | number
}

/**
 * 텍스트 스켈레톤 (fallback 전용)
 * - 항상 로딩 상태만 표현
 * - 실제 데이터 상태는 외부에서 제어
 */
export default function TextSkeleton({
  lines = 1,
  width = '100%',
  height = '16px',
}: Props) {
  return (
    <div className='text-container' style={{ width }}>
      <div className='text-skeleton'>
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className='skeleton-line skeleton' style={{ height }} />
        ))}
      </div>
    </div>
  )
}
