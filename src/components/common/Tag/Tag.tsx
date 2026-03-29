import './Tag.css'

import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/router'
import { useStore } from '@/store'

/**
 * 태그 아이템 컴포넌트
 * - 클릭 시 해당 태그 검색 결과 페이지로 이동
 *
 * @param tag 태그명
 * @param count 태그가 사용된 게시글 수 (선택적)
 */

interface Props {
  tag: string
  count?: number
}

export default function Tag({ tag, count }: Props) {
  const navigate = useNavigate()

  // 현재 검색 상태와 비교해 활성 태그 스타일 적용
  const searchKey = useStore(state => state.searchKey)
  const isActive = searchKey.replaceAll('#', '').split(' ').includes(tag)

  return (
    <div
      className={`tag clickable small ${isActive ? 'tag-active' : ''}`}
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        navigate(ROUTES.SEARCH(`%23${tag}`))
      }}
    >
      {tag} {count}
    </div>
  )
}
