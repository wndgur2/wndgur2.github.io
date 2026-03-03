import type { ReactElement } from 'react'

import './IconLink.css'

import { type IconType } from 'react-icons'

/**
 * 아이콘 링크 컴포넌트
 * - 아이콘과 URL을 받아 외부 링크 형태로 렌더링
 *
 * @param icon 아이콘 (react-icons)
 * @param url 링크 URL
 */

interface Props {
  icon: ReactElement<IconType>
  url: string
}

export default function IconLink({ icon, url }: Props) {
  return (
    <a
      href={url}
      className='icon-link clickable small content'
      target='_blank'
      rel='noreferrer'
    >
      {icon}
    </a>
  )
}
