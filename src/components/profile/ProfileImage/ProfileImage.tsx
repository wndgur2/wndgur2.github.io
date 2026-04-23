import useProfileImage from '@/hooks/useProfileImage'

import './ProfileImage.css'

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
      className='profile-img-wrapper'
      onClick={profileClickHandler}
      ref={profileRef}
    >
      <video
        className={`profile-video ${videoPlaying ? 'visible' : 'hidden'}`}
        autoPlay
        onEnded={() => setVideoPlaying(false)}
        ref={videoRef}
      />
      <picture className={`profile-img ${videoPlaying ? 'hidden' : 'visible'}`}>
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
