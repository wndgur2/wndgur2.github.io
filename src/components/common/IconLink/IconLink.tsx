import type { ReactElement } from 'react'

import styles from './IconLink.module.css'

import { type IconType } from 'react-icons'

/**
 * 아이콘 링크 컴포넌트
 * - 아이콘과 URL을 받아 외부 링크 형태로 렌더링
 *
 * @param icon 아이콘 (react-icons)
 * @param url 링크 URL
 * @param className 링크에 추가할 클래스
 */

interface Props {
  icon: ReactElement<IconType>
  url: string
  className?: string
}

export default function IconLink({ icon, url, className = '' }: Props) {
  return (
    <a
      href={url}
      className={`${styles.iconLink} clickable small content ${className}`}
      target='_blank'
      rel='noreferrer'
    >
      {icon}
    </a>
  )
}
