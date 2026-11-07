import styles from './TagList.module.css'

import Tag from '../Tag'

/**
 * 태그 목록 컴포넌트
 *
 * @param tags - 게시글에 달린 태그 문자열 배열
 * @param className - 목록(ol)에 추가할 클래스
 */

interface Props {
  tags: string[]
  className?: string
}

export default function TagList({ tags, className = '' }: Props) {
  return (
    <ol className={`${styles.tagList} ${className}`}>
      {tags.map((tag: string, index: number) => (
        <Tag key={index} tag={tag} />
      ))}
    </ol>
  )
}
