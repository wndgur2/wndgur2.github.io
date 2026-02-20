import type { ReactElement } from 'react'

import './IconLink.css'

import { type IconType } from 'react-icons'

interface IconLinkProps {
  icon: ReactElement<IconType>
  url: string
}

export default function IconLink({ icon, url }: IconLinkProps) {
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
