import { FunctionComponent } from 'react'
import './Profile.css'
import Tag from '../common/Tag'
import ProfileImage from './ProfileImage'

const Profile: FunctionComponent = () => {
  const stacks = ['html', 'css', 'typescript', 'javascript', 'react', 'nextJS', 'express']

  return (
    <div className='profile'>
      <ProfileImage />
      <div className='profile-content'>
        <h3 className='profile-name'>이중혁</h3>
        <div className='profile-tags'>
          { stacks.map((stack, index) => (
            <Tag
              key={ index }
              tag={ stack }
            />
          )) }
        </div>
      </div>
    </div>
  )
}

export default Profile
