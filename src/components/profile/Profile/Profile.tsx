import './Profile.css'

import { Suspense } from 'react'

import TagList from '@/components/common/TagList'
import Toast from '@/components/common/Toast'
import useToast from '@/hooks/useToast'
import ProfileImage from '../ProfileImage'
import ProfileTagCountList from '../ProfileTagCountList'

/**
 * 프로필 영역 컴포넌트
 * - 프로필 이미지 및 기본 정보 표시
 * - 전체 게시글 기준 태그 카운트 노출
 */
export default function Profile() {
  const {
    isMounted: showDownloadToast,
    isVisible: isDownloadToastVisible,
    showToast: handlePortfolioDownload,
  } = useToast({ duration: 3000 })

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
            onClick={handlePortfolioDownload}
          >
            포트폴리오.pdf
          </a>
        </h2>
        <div className='profile-tags'>
          <Suspense fallback={<TagList tags={[]} />}>
            <ProfileTagCountList />
          </Suspense>
        </div>
      </div>
      {showDownloadToast ? (
        <Toast
          message='다운로드 진행중...'
          isVisible={isDownloadToastVisible}
        />
      ) : null}
    </div>
  )
}
