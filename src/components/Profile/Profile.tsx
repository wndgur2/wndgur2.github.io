import './Profile.css'

import type { ITag } from '@/types'
import TagCountList from '../common/TagCountList'
import ProfileImage from './ProfileImage'

export default function Profile() {
  const tags: ITag[] = []

  return (
    <div className='profile'>
      <ProfileImage />
      <div className='profile-content'>
        <h2 className='profile-name'>이중혁</h2>
        <div className='profile-tags'>
          <TagCountList tags={tags} />
        </div>
      </div>
    </div>
  )
}
