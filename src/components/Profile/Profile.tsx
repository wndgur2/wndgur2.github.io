import { type FunctionComponent } from 'react'

import './Profile.css'

import { useRecoilValue } from 'recoil'

import { postsAtom } from '@/recoil'
import TagCountList from '../common/TagCountList'
import ProfileImage from './ProfileImage'

const Profile: FunctionComponent = () => {
  const posts = useRecoilValue(postsAtom)
  const tagsMap = Array.from(
    posts.reduce((acc, post) => {
      post.tags.forEach(tag => {
        acc.set(tag, (acc.get(tag) ?? 0) + 1)
      })
      return acc
    }, new Map()),
  )
  const tags = tagsMap
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)

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

export default Profile
