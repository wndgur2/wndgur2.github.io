import { useEffect } from 'react'

import { SITE_TITLE } from '@/consts/site'

/**
 * 페이지 제목을 브라우저 탭에 반영하고, 페이지를 벗어나면 사이트 제목으로 되돌리는 훅
 * - 정적 페이지의 <title>과 같은 형식을 유지한다 (scraper/lib/static-pages.js)
 */
export default function useDocumentTitle(title: string | undefined) {
  useEffect(() => {
    if (!title) return
    document.title = `${title} | ${SITE_TITLE}`

    return () => {
      document.title = SITE_TITLE
    }
  }, [title])
}
