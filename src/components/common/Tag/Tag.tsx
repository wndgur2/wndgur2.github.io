import styles from './Tag.module.css'

import { Link } from 'react-router-dom'

import useSearchKey from '@/features/search/useSearchKey'
import { ROUTES } from '@/router'

/**
 * 태그 아이템 컴포넌트
 * - 해당 태그 검색 결과 페이지로 가는 링크
 *
 * @param tag 태그명
 * @param count 태그가 사용된 게시글 수 (선택적)
 */

interface Props {
  tag: string
  count?: number
}

export default function Tag({ tag, count }: Props) {
  // 현재 검색 상태와 비교해 활성 태그 스타일 적용
  const searchKey = useSearchKey()
  const isActive = searchKey.replaceAll('#', '').split(' ').includes(tag)

  return (
    <Link
      to={ROUTES.SEARCH(`%23${tag}`)}
      className={`${styles.tag} clickable small ${isActive ? styles.tagActive : ''}`}
      aria-current={isActive ? 'true' : undefined}
    >
      {tag} {count}
    </Link>
  )
}
