import type { MouseEvent, ReactNode } from 'react'

import styles from './SkipLink.module.css'

/**
 * 건너뛰기 링크 컴포넌트
 * - 키보드 포커스를 받을 때만 화면에 나타난다
 * - 누르면 대상 요소로 포커스를 옮겨, 다음 Tab이 대상 뒤에서 이어지게 한다
 *
 * @param targetId 포커스를 옮길 요소의 id. 대상에는 tabIndex={-1}을 단다.
 * @param children 링크 글자
 * @param className 위치를 바꿀 때 넘기는 클래스. 기본값은 화면 왼쪽 위에 고정된다.
 */

interface Props {
  targetId: string
  children: ReactNode
  className?: string
}

export default function SkipLink({ targetId, children, className = '' }: Props) {
  // 해시 이동은 라우터 주소를 바꾸므로 직접 포커스를 옮긴다.
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById(targetId)
    if (!target) return
    e.preventDefault()
    target.focus()
  }

  return (
    <a href={`#${targetId}`} className={`${styles.skipLink} ${className}`}
      onClick={handleClick}>
      {children}
    </a>
  )
}
