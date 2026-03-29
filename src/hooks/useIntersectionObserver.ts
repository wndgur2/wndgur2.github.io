import { useEffect, useState } from 'react'

export function useIntersectionObserver<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  options?: IntersectionObserverInit,
) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const threshold =
      typeof options?.threshold === 'number' ? options.threshold : 0

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.intersectionRatio >= threshold)
    }, options)

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [ref, options])

  return isVisible
}
