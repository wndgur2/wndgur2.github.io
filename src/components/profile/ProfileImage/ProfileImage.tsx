import useProfileImage from '@/hooks/useProfileImage'

import styles from './ProfileImage.module.css'

/**
 * 프로필 이미지 컴포넌트
 * - 프로필 클릭 이벤트 처리
 * - 이미지/비디오 전환 애니메이션 표현
 */
export default function ProfileImage() {
  const {
    profileRef,
    profileClickHandler,
    videoRef,
    videoPlaying,
    setVideoPlaying,
    imgIndex,
  } = useProfileImage()

  return (
    <button
      className={styles.profileImgWrapper}
      onClick={profileClickHandler}
      ref={profileRef}
    >
      <video
        className={`${styles.profileVideo} ${videoPlaying ? '' : styles.hidden}`}
        autoPlay
        onEnded={() => setVideoPlaying(false)}
        ref={videoRef}
      />
      <picture
        className={`${styles.profileImg} ${videoPlaying ? styles.hidden : ''}`}
      >
        <source
          srcSet={`/images/profile/${imgIndex}.webp`}
          type='image/webp'
        />
        <img
          src={`/images/profile/${imgIndex}.jpeg`}
          width={304}
          height={304}
          loading='eager'
          fetchPriority='high'
          decoding='async'
          alt='profile'
          draggable={false}
        />
      </picture>
    </button>
  )
}
