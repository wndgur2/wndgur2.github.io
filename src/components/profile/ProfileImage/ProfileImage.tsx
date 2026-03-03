import useProfileImage from '@/hooks/useProfileImage'

import './ProfileImage.css'

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
