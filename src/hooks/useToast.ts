import { useCallback, useEffect, useRef, useState } from 'react'

interface UseToastOptions {
  duration?: number
}

const TOAST_FADE_DURATION_MS = 180

export default function useToast({ duration = 3000 }: UseToastOptions = {}) {
  const [isMounted, setIsMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const hideTimeoutRef = useRef<number | null>(null)
  const unmountTimeoutRef = useRef<number | null>(null)

  const clearHideTimer = useCallback(() => {
    if (hideTimeoutRef.current !== null) {
      window.clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }
  }, [])

  const clearUnmountTimer = useCallback(() => {
    if (unmountTimeoutRef.current !== null) {
      window.clearTimeout(unmountTimeoutRef.current)
      unmountTimeoutRef.current = null
    }
  }, [])

  const hideToast = useCallback(() => {
    clearHideTimer()
    clearUnmountTimer()
    setIsVisible(false)

    // fade-out 애니메이션이 끝난 뒤 DOM에서 제거
    unmountTimeoutRef.current = window.setTimeout(() => {
      setIsMounted(false)
      unmountTimeoutRef.current = null
    }, TOAST_FADE_DURATION_MS)
  }, [clearHideTimer, clearUnmountTimer])

  const showToast = useCallback(() => {
    // 재호출 시에도 mount 유지 + 타이머를 초기화하여 자연스럽게 갱신
    setIsMounted(true)
    setIsVisible(true)
    clearHideTimer()
    clearUnmountTimer()

    hideTimeoutRef.current = window.setTimeout(() => {
      hideToast()
      hideTimeoutRef.current = null
    }, duration)
  }, [clearHideTimer, clearUnmountTimer, duration, hideToast])

  useEffect(() => {
    return () => {
      clearHideTimer()
      clearUnmountTimer()
    }
  }, [clearHideTimer, clearUnmountTimer])

  return {
    isMounted,
    isVisible,
    showToast,
    hideToast,
  }
}
