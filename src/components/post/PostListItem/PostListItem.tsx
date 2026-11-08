import styles from './PostListItem.module.css'

import Card, { CardLink } from '@/components/common/Card'
import TagList from '@/components/common/TagList'
import CATEGORIES from '@/consts/CATEGORIES'
import useSearchKey from '@/features/search/useSearchKey'
import { ROUTES } from '@/router'
import { type IPost } from '@/types'

/**
 * 게시글 목록 아이템 컴포넌트
 * - 제목/날짜/미리보기/태그 정보를 표시
 * - 클릭 시 상세 페이지로 이동
 *
 * @param post 목록에서 표시할 게시글 데이터
 * @param className 카드에 추가할 클래스
 */

interface Props {
  post: IPost
  className?: string
}

export default function PostListItem({ post, className = '' }: Props) {
  const searchKey = useSearchKey()

  const preview = post.content
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/[#>*_`~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 170)

  return (
    <Card className={`${styles.postListItem} ${className}`}>
      <header className='content'>
        <h3>
          <span>
            <CardLink
              to={ROUTES.POST_DETAIL(post.id)}
              state={{ fromSearchKey: searchKey }}
            >
              {post.title}
            </CardLink>
          </span>
          {post.site && <small>{post.site}</small>}
          {post.number && <small>{post.number}</small>}
        </h3>
        <small>
          {post.date_started}
          {post.category === CATEGORIES.PROJECT && `~ ${post.date_finished}`}
        </small>
      </header>
      <section className={styles.preview}>
        <p className='content'>{preview}...</p>
      </section>
      <TagList tags={post.tags} />
    </Card>
  )
}
