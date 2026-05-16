import { useEffect, useMemo, useRef, useState } from 'react'
import { FaRegFaceSadCry } from 'react-icons/fa6'

import './ImageSkeleton.css'

/**
 * 이미지 스켈레톤 컴포넌트
 * - 이미지 로딩 중 스켈레톤 표시
 * - 로드 실패 시 대체 UI 렌더링
 *
 * @param attrs img 태그에 전달할 속성 객체
 */

interface Props {
  attrs: React.ImgHTMLAttributes<HTMLImageElement>
}

function intrinsicSizeFromAttrs(
  attrs: React.ImgHTMLAttributes<HTMLImageElement>,
): { w: number; h: number } | null {
  const { width, height } = attrs
  if (width == null || height == null) return null
  const w = typeof width === 'number' ? width : parseInt(String(width), 10)
  const h = typeof height === 'number' ? height : parseInt(String(height), 10)
  if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) return null
  return { w, h }
}

export default function ImageSkeleton({ attrs }: Props) {
  const skeletonRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [isError, setIsError] = useState(false)
  const src = attrs.src || ''

  useEffect(() => {
    setIsError(false)
  }, [src])
  const optimizedSrc = src.replace(/\.jpe?g(\?.*)?$/i, '.webp$1')
  const hasOptimizedSource = optimizedSrc !== src

  const fromAttrs = useMemo(() => intrinsicSizeFromAttrs(attrs), [attrs.width, attrs.height])
  const [dims, setDims] = useState<{ w: number; h: number } | null>(fromAttrs)

  useEffect(() => {
    if (fromAttrs) {
      setDims(fromAttrs)
      return
    }

    let cancelled = false
    setDims(null)

    const applySize = (url: string) => {
      const image = new Image()
      image.onload = () => {
        if (cancelled) return
        setDims({ w: image.naturalWidth, h: image.naturalHeight })
      }
      image.onerror = () => {
        if (cancelled) return
        if (url !== src && src) {
          applySize(src)
        }
      }
      image.src = url
    }

    applySize(hasOptimizedSource ? optimizedSrc : src)

    return () => {
      cancelled = true
    }
  }, [fromAttrs, src, optimizedSrc, hasOptimizedSource])

  const hasDims = dims != null && dims.w > 0 && dims.h > 0

  const containerStyle = hasDims
    ? ({
        '--img-nw': dims.w,
        '--img-nh': dims.h,
      } as React.CSSProperties)
    : undefined

  // 이미지 로드 성공/실패 상태에 따라 스켈레톤 및 표시 상태 전환
  useEffect(() => {
    if (!imgRef.current) return
    const image = imgRef.current

    image.src = src
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
    <var
      className='image-container'
      style={containerStyle}
      data-has-dims={hasDims ? 'true' : 'false'}
    >
      <canvas
        key={src}
        className='image-skeleton skeleton'
        ref={skeletonRef}
      />
      <var className='image-wrapper'>
        {isError ? (
          <var className='no-image-container'>
            <FaRegFaceSadCry className='no-image minor' size={48} />
            <small>이미지를 못 가져왔어요.</small>
            <small>{attrs.src}</small>
          </var>
        ) : (
          <picture>
            {hasOptimizedSource ? (
              <source srcSet={optimizedSrc} type='image/webp' />
            ) : null}
            <img
              alt=''
              {...attrs}
              loading={attrs.loading ?? 'lazy'}
              decoding='async'
              fetchPriority={attrs.fetchPriority ?? 'auto'}
              ref={imgRef}
            />
          </picture>
        )}
      </var>
    </var>
  )
}
