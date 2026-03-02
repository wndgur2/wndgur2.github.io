import { useEffect, useRef, useState } from 'react'

import './ProfileImage.css'

const IMG_AMOUNT = 5

export default function ProfileImage() {
  const profileRef = useRef<HTMLButtonElement>(null)
  const [imgIndex, setImgIndex] = useState(0)
  const clickCounts = useRef<Record<number, number>>({})
  const [videoPlaying, setVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // preload images
    for (let i = 0; i < IMG_AMOUNT; i++) {
      const img = new Image()
      img.src = `/images/profile/${i}.jpeg`
    }
  })

  const profileClicked = () => {
    if (!profileRef.current) return

    switch (Math.floor(Math.random() * 4)) {
      case 0:
        profileRef.current.style.animation = 'spinLeft 0.3s'
        setImgIndex((imgIndex + 1) % IMG_AMOUNT)
        break
      case 1:
        profileRef.current.style.animation = 'spinRight 0.3s'
        setImgIndex((imgIndex + 2) % IMG_AMOUNT)
        break
      case 2:
        profileRef.current.style.animation = 'shake 0.3s'
        break
      case 3:
        clickCounts.current[imgIndex] = (clickCounts.current[imgIndex] || 0) + 1
        if (videoRef.current) {
          videoRef.current.src = `/videos/profile/${imgIndex}.mp4`
          videoRef.current.oncanplay = () => {
            setVideoPlaying(true)
          }
        }
        break
    }
    profileRef.current.disabled = true
    setTimeout(() => {
      if (profileRef.current) {
        profileRef.current.style.animation = ''
        profileRef.current.disabled = false
      }
    }, 300)
  }

  return (
    <button
      className='profile-img-wrapper'
      onClick={profileClicked}
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
