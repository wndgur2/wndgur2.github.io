import { FunctionComponent, useState } from 'react'
import './Profile.css'
import Tag from '../Tag'
import ProfileImage from './ProfileImage'
import Marquee from 'react-fast-marquee'

const Profile: FunctionComponent = () => {
  const stacks = ['HTML', 'CSS', 'Typescript', 'Javascript', 'ReactJs', 'NextJs', 'Express']
  const marquees = ['leejunghyeok', '1999.11.08', '삼성청년SW아카데미', 'web fullstack developer']
  const speeds = [50, 100, 20, 30]

  const [hovered, setHovered] = useState(-1)


  return (
    <div className='profile'>
      <ProfileImage />
      <div className='profile-content'>
        <h2 className='profile-name'>이중혁</h2>
        <h3 className='profile-description'>기술 블로그</h3>
        <div className='profile-tags'>
          { stacks.map((stack, index) => (
            <Tag
              key={ index }
              tag={ stack }
            />
          )) }
        </div>
      </div>

      {/* <div className='marquee-container'>
        { marquees.map((text, index) => (
          <div onMouseEnter={ () => setHovered(index) }>
            <Marquee key={ index } className='marquee' play={ hovered == index } speed={ speeds[index] } >
              <span className='in-marquee'>{ text }</span>
            </Marquee>
          </div>
        )) }
      </div> */}
    </div>
  )
}

export default Profile
