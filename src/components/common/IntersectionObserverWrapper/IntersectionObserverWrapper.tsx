import { useRef } from 'react'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface Props {
  children: React.ReactNode
  threshold?: number | number[]
  className?: string
  visibleClassName: string
}

export default function IntersectionObserverWrapper({
  children,
  threshold = 0,
  className,
  visibleClassName,
}: Props) {
  const wrapperDivRef = useRef<HTMLDivElement>(null)
  const isVisible = useIntersectionObserver(wrapperDivRef, {
    threshold,
  })
  return (
    <div
      ref={wrapperDivRef}
      className={`${className} ${isVisible ? visibleClassName : undefined}`}
    >
      <div className='intersection-observer-children-wrapper'>{children}</div>
    </div>
  )
}
