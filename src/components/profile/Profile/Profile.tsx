import './Profile.css'

import { useRecoilValue } from 'recoil'

import { postsAtom } from '@/store'
import { getTagsWithCounts } from '@/utils/tag'
import TagCountList from '../../common/TagCountList'
import ProfileImage from '../ProfileImage'

/**
 * 프로필 영역 컴포넌트
 * - 프로필 이미지 및 기본 정보 표시
 * - 전체 게시글 기준 태그 카운트 노출
 */
export default function Profile() {
  const posts = useRecoilValue(postsAtom)
  const tags = getTagsWithCounts(posts)

  return (
    <div className='profile'>
      <ProfileImage />
      <div className='profile-content'>
        <h2 className='profile-name'>
          이중혁 <br />
          <a
            className='profile-portfolio clickable small'
            href={`/pdf/LeeJunghyeok_Portfolio.pdf`}
            target='_blank'
            rel='noopener noreferrer'
            download
          >
            포트폴리오.pdf
          </a>
        </h2>
        <div className='profile-tags'>
          <TagCountList tags={tags} />
        </div>
      </div>
    </div>
  )
}
