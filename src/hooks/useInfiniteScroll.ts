import { useCallback, useEffect, useRef, useState } from 'react'

interface UseInfiniteScrollProps<T> {
  items: T[]
  pageSize?: number
  deps?: any[]
}

const useInfiniteScroll = <T>({
  items,
  pageSize = 10,
  deps = [],
}: UseInfiniteScrollProps<T>) => {
  const [visibleCount, setVisibleCount] = useState(pageSize)
  const [isLoading, setIsLoading] = useState(false)
  const observerRef = useRef<HTMLDivElement | null>(null)
  const observerInstance = useRef<IntersectionObserver | null>(null)

  const hasMore = visibleCount < items.length

  // 🔥 초기화
  useEffect(() => {
    setVisibleCount(pageSize)
  }, [pageSize, ...deps])

  const loadMore = useCallback(() => {
    if (!hasMore || isLoading) return

    setIsLoading(true)

    // 자연스러운 로딩 효과 (Recoil에 이미 있으므로 fake delay)
    setTimeout(() => {
      setVisibleCount(prev =>
        prev + pageSize > items.length ? items.length : prev + pageSize,
      )
      setIsLoading(false)
    }, 300)
  }, [hasMore, isLoading, items.length, pageSize])

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting) {
        loadMore()
      }
    },
    [loadMore],
  )

  useEffect(() => {
    if (!observerRef.current) return

    observerInstance.current = new IntersectionObserver(handleObserver, {
      rootMargin: '300px', // 미리 로드
      threshold: 0,
    })

    observerInstance.current.observe(observerRef.current)

    return () => {
      observerInstance.current?.disconnect()
    }
  }, [handleObserver, visibleCount]) // 🔥 visibleCount 변화 시 재연결

  const visibleItems = items.slice(0, visibleCount)

  return {
    visibleItems,
    observerRef,
    isLoading,
    hasMore,
  }
}

export default useInfiniteScroll
