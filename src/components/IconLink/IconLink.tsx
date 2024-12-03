import { FunctionComponent, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import './IconLink.css'
import { IconType } from 'react-icons'

interface IconLinkProps {
  icon: ReactElement<IconType>
  url: string
}

const IconLink: FunctionComponent<IconLinkProps> = ({ icon, url }) => {
  return (
    <Link
      to={url}
      className='icon-link clickable link small'
    >
      {icon}
    </Link>
  )
}

export default IconLink
