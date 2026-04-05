import { useCallback, useEffect, useRef, useState } from 'react'

interface UseInfiniteScrollProps<T> {
  items: T[]
  pageSize?: number
  deps?: unknown[]
}

const useInfiniteScroll = <T>({
  items,
  pageSize = 10,
  deps = [],
}: UseInfiniteScrollProps<T>) => {
  const [loadedCount, setLoadedCount] = useState(pageSize)
  const [isLoading, setIsLoading] = useState(false)
  const observerRef = useRef<HTMLDivElement | null>(null)
  const observerInstance = useRef<IntersectionObserver | null>(null)

  const hasMore = loadedCount < items.length

  // 🔥 초기화
  useEffect(() => {
    setLoadedCount(pageSize)
  }, [pageSize, ...deps])

  const loadMore = useCallback(() => {
    if (!hasMore || isLoading) return

    setIsLoading(true)

    // 자연스러운 로딩 효과를 위한 짧은 지연
    setTimeout(() => {
      setLoadedCount(prev =>
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
  }, [handleObserver, loadedCount])

  const loadedItems = items.slice(0, loadedCount)

  return {
    loadedItems,
    observerRef,
    isLoading,
    hasMore,
  }
}

export default useInfiniteScroll
