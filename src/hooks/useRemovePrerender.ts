import { useLayoutEffect } from 'react'

/**
 * 빌드 시 생성된 정적 본문(#prerender)을 앱 화면으로 교체하는 훅
 * - 앱이 준비될 때까지 #root는 숨겨져 있어, 스피너 없이 바로 전환된다
 */
export default function useRemovePrerender() {
  useLayoutEffect(() => {
    document.getElementById('prerender')?.remove()
  }, [])
}
