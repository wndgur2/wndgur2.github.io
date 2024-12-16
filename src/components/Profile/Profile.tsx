import { FunctionComponent } from 'react'
import './Profile.css'
import ProfileImage from './ProfileImage'
import TagList from '../common/TagList'

const Profile: FunctionComponent = () => {
  const stacks = ['typescript', 'javascript', 'react', 'next.js', 'express', 'css', 'java']

  return (
    <div className="profile">
      <ProfileImage />
      <div className="profile-content">
        <h2 className="profile-name">이중혁</h2>
        <div className="profile-tags">
          <TagList tags={stacks} />
        </div>
      </div>
    </div>
  )
}

export default Profile
