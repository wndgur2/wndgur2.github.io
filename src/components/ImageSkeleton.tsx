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

    if (!image) return
    image.src = props.src
    imgRef.current.classList.add('loading')
    image.onload = () => {
      if (!skeletonRef.current) return
      skeletonRef.current.remove()
      if (!imgRef.current) return
      imgRef.current.classList.replace('loading', 'loaded')
    }
  }, [props.src])

  useEffect(() => {
    if (!skeletonRef.current) return
    // set random animation duration
    const duration = Math.random() * 2
    skeletonRef.current.style.setProperty('animation-delay', `${duration}s`)

  }, [skeletonRef])

  return (
    <div className='image-wrapper'>
      <canvas
        className='image-skeleton'
        ref={ skeletonRef }
      />
      <img
        alt=''
        { ...props }
        ref={ imgRef }
      />
    </div>
  )
}

export default ImageSkeleton
