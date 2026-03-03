import { useEffect, useRef, useState } from 'react'
import { FaRegFaceSadCry } from 'react-icons/fa6'

import './ImageSkeleton.css'

interface Props {
  attrs: React.ImgHTMLAttributes<HTMLImageElement>
}

export default function ImageSkeleton({ attrs }: Props) {
  const skeletonRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (!imgRef.current) return
    const image = imgRef.current

    image.src = attrs.src || ''
    imgRef.current.classList.add('loading')
    image.onload = () => {
      skeletonRef.current?.remove()
      imgRef.current?.classList.replace('loading', 'loaded')
    }
    image.onerror = () => {
      skeletonRef.current?.remove()
      setIsError(true)
    }
  }, [attrs.src])

  return (
    <var className='image-container'>
      <canvas className='image-skeleton' ref={skeletonRef} />
      <var className='image-wrapper'>
        {isError ? (
          <var className='no-image-container'>
            <FaRegFaceSadCry className='no-image minor' size={48} />
            <small>이미지를 못 가져왔어요.</small>
            <small>{attrs.src}</small>
          </var>
        ) : (
          <img alt='' {...attrs} ref={imgRef} />
        )}
      </var>
    </var>
  )
}
