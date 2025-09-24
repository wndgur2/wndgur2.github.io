import { type FunctionComponent } from 'react'

import './Profile.css'

import TagList from '../common/TagList'
import ProfileImage from './ProfileImage'

const Profile: FunctionComponent = () => {
  const stacks = [
    'typescript',
    'javascript',
    'react',
    'next.js',
    'express',
    'css',
    'java',
  ]

  return (
    <div className='profile'>
      <ProfileImage />
      <div className='profile-content'>
        <h3 className='profile-name'>이중혁</h3>
        <div className='profile-tags'>
          <TagList tags={stacks} />
        </div>
      </div>
    </div>
  )
}

export default Profile
