import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

/**
 * 외부 URL로 접근하여 404 발생 시 경로를 lost_url param으로 전달받아 URL 복구하는 훅
 */
export default function useRestoreLostUrl() {
  const searchParams = useSearchParams()[0]
  const router = useNavigate()
  const lost_url = searchParams.get('lost_url')

  // 외부에서 전달된 경로 복구 파라미터가 있으면 해당 경로로 이동
  useEffect(() => {
    if (!lost_url) return
    let paths = lost_url.split('/')
    paths = paths.map(path => encodeURIComponent(path))
    router(`/${paths.join('/')}`)
  }, [lost_url, router])
}
