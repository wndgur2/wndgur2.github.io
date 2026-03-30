import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from './contexts/ThemeProvider'
import { router } from './router'

/**
 * 애플리케이션 루트 컴포넌트
 * - 게시글 데이터 초기 로드
 * - 테마 컨텍스트 및 라우터 트리 구성
 */
export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
