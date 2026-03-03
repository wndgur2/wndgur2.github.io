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
      <img
        className={`profile-img ${videoPlaying ? 'hidden' : 'visible'}`}
        src={`/images/profile/${imgIndex}.jpeg`}
        alt='profile'
      />
    </button>
  )
}
