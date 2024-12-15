import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { FaRegFaceSadCry } from 'react-icons/fa6'

import './ImageSkeleton.css'
interface ImageSkeletonProps {
  img?: JSX.Element
  props: any
}

const ImageSkeleton: FunctionComponent<ImageSkeletonProps> = ({ props }) => {
  const skeletonRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (!imgRef.current) return
    const image = imgRef.current

    image.src = props.src
    imgRef.current.classList.add('loading')
    image.onload = () => {
      skeletonRef.current?.remove()
      imgRef.current?.classList.replace('loading', 'loaded')
    }
    image.onerror = () => {
      skeletonRef.current?.remove()
      setIsError(true)
    }
  }, [props.src])

  return (
    <div className="image-container">
      <canvas
        className="image-skeleton"
        ref={skeletonRef}
      />
      <div className="image-wrapper">
        {isError ? (
          <div className="no-image-container">
            <FaRegFaceSadCry
              className="no-image minor"
              size={48}
            />
            <small>이미지를 못 가져왔어요.</small>
            <small>{props.src}</small>
          </div>
        ) : (
          <img
            alt=""
            {...props}
            ref={imgRef}
          />
        )}
      </div>
    </div>
  )
}

export default ImageSkeleton
