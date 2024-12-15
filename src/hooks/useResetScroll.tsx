import { useEffect } from 'react'

const useResetScroll = (dependency: any = undefined) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [dependency])
}

export default useResetScroll
