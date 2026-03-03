import './Profile.css'

import { useRecoilValue } from 'recoil'

import { postsAtom } from '@/recoil'
import { getTagsWithCounts } from '@/utils/tag'
import TagCountList from '../../common/TagCountList'
import ProfileImage from '../ProfileImage'

export default function Profile() {
  const posts = useRecoilValue(postsAtom)
  const tags = getTagsWithCounts(posts)

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
