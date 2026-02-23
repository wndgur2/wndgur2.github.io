import { useEffect, useRef, useState, type JSX } from 'react'
import { FaRegFaceSadCry } from 'react-icons/fa6'

import './ImageSkeleton.css'

interface ImageSkeletonProps extends Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'children' | 'dangerouslySetInnerHTML'
> {}

export default function ImageSkeleton({ src, ...rest }: ImageSkeletonProps) {
  const skeletonRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (!imgRef.current) return
    const image = imgRef.current

    image.src = src || ''
    imgRef.current.classList.add('loading')
    image.onload = () => {
      skeletonRef.current?.remove()
      imgRef.current?.classList.replace('loading', 'loaded')
    }
    image.onerror = () => {
      skeletonRef.current?.remove()
      setIsError(true)
    }
  }, [src])

  return (
    <var className='image-container'>
      <canvas className='image-skeleton' ref={skeletonRef} />
      <var className='image-wrapper'>
        {isError ? (
          <var className='no-image-container'>
            <FaRegFaceSadCry className='no-image minor' size={48} />
            <small>이미지를 못 가져왔어요.</small>
            <small>{src}</small>
          </var>
        ) : (
          <img alt='' {...rest} ref={imgRef} />
        )}
      </var>
    </var>
  )
}
