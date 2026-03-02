import { useEffect, useRef, useState } from 'react'

const IMG_AMOUNT = 5

export default function useProfileImage() {
  const profileRef = useRef<HTMLButtonElement>(null)
  const [imgIndex, setImgIndex] = useState(0)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    for (let i = 0; i < IMG_AMOUNT; i++) {
      const img = new Image()
      img.src = `/images/profile/${i}.jpeg`
    }
  })

  const profileClickHandler = () => {
    if (!profileRef.current) return

    if (videoPlaying) {
      if (videoRef.current) videoRef.current.pause()
      setVideoPlaying(false)
      return
    }

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
        if (videoRef.current) {
          videoRef.current.src = `/videos/profile/${imgIndex}.mp4`
          videoRef.current.onplay = () => {
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

  return {
    profileRef,
    profileClickHandler,
    videoRef,
    videoPlaying,
    setVideoPlaying,
    imgIndex,
  }
}
