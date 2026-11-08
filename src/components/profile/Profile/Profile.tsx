import styles from './Profile.module.css'

import { Suspense } from 'react'

import SkipLink from '@/components/common/SkipLink'
import TagList from '@/components/common/TagList'
import Toast from '@/components/common/Toast'
import useToast from '@/hooks/useToast'
import ProfileImage from '@/components/profile/ProfileImage'
import ProfileTagCountList from '@/components/profile/ProfileTagCountList'

// 태그가 많아 Tab으로 지나기 어려우므로 건너뛰기 링크가 이 지점으로 포커스를 옮긴다.
const TAGS_END_ID = 'profile-tags-end'

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
    <div className={styles.profile}>
      <ProfileImage />
      <div className={styles.profileContent}>
        <h2 className={styles.profileName}>
          이중혁 <br />
          <a
            className={`${styles.profilePortfolio} clickable small`}
            href={`/pdf/LeeJunghyeok_Portfolio.pdf`}
            target='_blank'
            rel='noopener noreferrer'
            download
            onClick={handlePortfolioDownload}
          >
            포트폴리오.pdf
          </a>
        </h2>
        <div className={styles.tagsArea}>
          <SkipLink targetId={TAGS_END_ID} className={styles.tagsSkipLink}>
            태그 목록 건너뛰기
          </SkipLink>
          <div className={styles.profileTags}>
            <Suspense
              fallback={<TagList tags={[]} className={styles.profileTagList} />}
            >
              <ProfileTagCountList className={styles.profileTagList} />
            </Suspense>
          </div>
          <div id={TAGS_END_ID} tabIndex={-1} className={styles.tagsEnd} />
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
