import { useRef } from 'react'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface Props {
  children: React.ReactNode
  threshold?: number | number[]
  className?: string
  visibleClassName: string
  childrenClassName?: string
}

export default function IntersectionObserverWrapper({
  children,
  threshold = 0,
  className,
  visibleClassName,
  childrenClassName,
}: Props) {
  const wrapperDivRef = useRef<HTMLDivElement>(null)
  const isVisible = useIntersectionObserver(wrapperDivRef, {
    threshold,
  })
  return (
    <div
      ref={wrapperDivRef}
      className={[className, isVisible && visibleClassName]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={childrenClassName}>{children}</div>
    </div>
  )
}
