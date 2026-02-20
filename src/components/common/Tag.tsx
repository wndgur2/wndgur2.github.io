import { useEffect, useRef } from 'react'

import './Tag.css'

import { useLocation, useNavigate } from 'react-router-dom'

interface TagProps {
  label: string
  count?: number
}

export default function Tag({ label, count }: TagProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const tagRef = useRef<HTMLLIElement>(null)
  useEffect(() => {
    if (!location.state) return
    if (!tagRef.current) return
    if (location.state.searchKey.replaceAll('#', '').split(' ').includes(label))
      tagRef.current.classList.add('tag-active')
    else tagRef.current.classList.remove('tag-active')
  }, [location.state, label])
  return (
    <li
      key={`${label}${count}`}
      ref={tagRef}
      className='tag clickable small'
      onClick={e => {
        e.preventDefault() // x e.stopPropagation()
        e.stopPropagation()
        navigate(`/search/%23${label}`, { state: { searchKey: `#${label}` } })
      }}
    >
      {label} {count}
    </li>
  )
}
