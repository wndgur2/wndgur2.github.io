import { FunctionComponent, ReactElement } from 'react'
import './IconLink.css'
import { IconType } from 'react-icons'

interface IconLinkProps {
  icon: ReactElement<IconType>
  url: string
}

const IconLink: FunctionComponent<IconLinkProps> = ({ icon, url }) => {
  return (
    <a href={url} className="icon-link clickable small content" target="_blank" rel="noreferrer">
      {icon}
    </a>
  )
}

export default IconLink
