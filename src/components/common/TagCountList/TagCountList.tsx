import styles from './TagCountList.module.css'

import InterssectionObserverWrapper from '@/components/common/IntersectionObserverWrapper'
import Tag from '@/components/common/Tag'

/**
 * 태그 카운트 목록 컴포넌트
 * - 태그명과 해당 태그가 사용된 게시글 수를 리스트 형태로 표시
 *
 * @param tags 태그명과 해당 태그가 사용된 게시글 수를 담은 객체 배열
 * @param className 목록(ol)에 추가할 클래스
 */
interface Props {
  tags: { tag: string; count: number }[]
  className?: string
}

export default function TagCountList({ tags, className = '' }: Props) {
  return (
    <ol className={`${styles.tagList} ${className}`}>
      {tags.map(({ tag, count }, index: number) => (
        <li key={`${tag}${count}${index}`}>
          <InterssectionObserverWrapper
            className={styles.tagItem}
            visibleClassName={styles.tagVisible}
            childrenClassName={styles.tagContent}
            threshold={1}
          >
            <Tag tag={tag} count={count} />
          </InterssectionObserverWrapper>
        </li>
      ))}
    </ol>
  )
}
