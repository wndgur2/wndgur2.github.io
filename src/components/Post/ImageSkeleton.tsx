import { FunctionComponent, useEffect, useRef } from 'react'
import './ImageSkeleton.css'
interface ImageSkeletonProps {
  img?: JSX.Element
  props: any
}

const ImageSkeleton: FunctionComponent<ImageSkeletonProps> = ({ props }) => {
  const skeletonRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!imgRef.current) return
    const image = imgRef.current

    image.src = props.src
    imgRef.current.classList.add('loading')
    image.onload = () => {
      skeletonRef.current?.remove()
      imgRef.current?.classList.replace('loading', 'loaded')
    }
  }, [props.src])

  return (
    <div className='image-container'>
      <canvas
        className='image-skeleton'
        ref={ skeletonRef }
      />
      <div
        className='image-wrapper'
      >
        <img
          alt=''
          { ...props }
          ref={ imgRef }
        />
      </div>
    </div>
  )
}

export default ImageSkeleton
