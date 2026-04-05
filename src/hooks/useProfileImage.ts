import { useEffect, useRef, useState } from 'react'

const IMG_AMOUNT = 5

export default function useProfileImage() {
  const profileRef = useRef<HTMLButtonElement>(null)
  const [imgIndex, setImgIndex] = useState(0)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const clickCountRef = useRef(0)
  const maxClickCountRef = useRef(Math.random() * 2 + 1)

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

    if (clickCountRef.current++ < maxClickCountRef.current) {
      profileRef.current.style.animation = 'shake 0.3s'
    } else {
      switch (Math.floor(Math.random() * 2)) {
        case 0:
          profileRef.current.style.animation = 'spinLeft 0.3s'
          setImgIndex((imgIndex + 1) % IMG_AMOUNT)
          break
        case 1:
          if (videoRef.current) {
            videoRef.current.src = `/videos/profile/${imgIndex}.mp4`
            videoRef.current.onplay = () => {
              setVideoPlaying(true)
            }
            profileRef.current.disabled = true
          }
          break
      }

      clickCountRef.current = 0
      maxClickCountRef.current = Math.random() * 2 + 2
    }
    setTimeout(() => {
      if (profileRef.current) {
        profileRef.current.style.animation = ''
      }
    }, 300)
    setTimeout(() => {
      if (profileRef.current) {
        profileRef.current.disabled = false
      }
    }, 1000)
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
