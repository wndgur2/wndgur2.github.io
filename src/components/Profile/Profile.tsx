import { FunctionComponent } from 'react'
import './Profile.css'
import Tag from '../Tag'
import ProfileImage from './ProfileImage'

const Profile: FunctionComponent = () => {
  const stacks = ['HTML', 'CSS', 'Typescript', 'Javascript', 'ReactJs', 'NextJs', 'Express']

  return (
    <div className='profile'>
      <ProfileImage />
      <div className='profile-content'>
        <h2 className='profile-name'>이중혁</h2>
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
