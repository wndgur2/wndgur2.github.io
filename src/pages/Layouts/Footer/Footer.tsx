import { FunctionComponent } from 'react'
import './Footer.css'
import { IoLogoGithub } from 'react-icons/io'
import { HiOutlineMail } from 'react-icons/hi'
import { FaYoutube } from 'react-icons/fa'
import IconLink from '../../../components/IconLink/IconLink'

const Footer: FunctionComponent = () => {
  return (
    <footer>
      <div className='links'>
        <div className='footer-item col'>
          <IconLink
            icon={ <IoLogoGithub size={ 38 } /> }
            url={ 'https://github.com/wndgur2' }
          />
          <div className='seperator' />
          <small>Github</small>
          <small>@wndgur2</small>
        </div>
        <div className='footer-item col'>
          <IconLink
            icon={ <HiOutlineMail size={ 34 } /> }
            url={ 'https://mail.google.com/mail/?view=cm&to=dkandjsl@gmail.com' }
          />
          <div className='seperator' />
          <small>Email</small>
          <small>dkandjsl@gmail.com</small>
        </div>
        <div className='footer-item col'>
          <IconLink
            icon={ <FaYoutube size={ 30 } /> }
            url={ 'https://www.youtube.com/@junghyeok_lee6710' }
          />
          <div className='seperator' />
          <small>Youtube</small>
          <small>@junghyeok_lee6710</small>
        </div>
      </div>
    </footer>
  )
}

export default Footer
