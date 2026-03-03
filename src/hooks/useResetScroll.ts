import { useEffect } from 'react'

const useResetScroll = (dependency: unknown = undefined) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [dependency])
}

export default useResetScroll
