import cardStyles from '@/components/post/PostCard.module.css'
import styles from './ProjectListItem.module.css'

import { CiImageOff } from 'react-icons/ci'
import { Link } from 'react-router-dom'

import TagList from '@/components/common/TagList'
import ImageSkeleton from '@/components/post/ImageSkeleton'
import useSearchKey from '@/features/search/useSearchKey'
import { ROUTES } from '@/router'
import { type IPost } from '@/types'

/**
 * 프로젝트 목록 아이템 컴포넌트
 * - 썸네일/요약/메타 정보를 카드 형태로 표시
 * - 클릭 시 상세 페이지로 이동
 *
 * @param post 목록에서 표시할 프로젝트 게시글 데이터
 * @param className 링크에 추가할 클래스
 */

interface Props {
  post: IPost
  className?: string
}

export default function ProjectListItem({ post, className = '' }: Props) {
  const searchKey = useSearchKey()

  return (
    <Link
      to={ROUTES.POST_DETAIL(post.id)}
      className={`${cardStyles.card} ${styles.project} link clickable ${className}`}
      state={{ fromSearchKey: searchKey }}
    >
      <section>
        <div className={styles.projectImageWrapper}>
          {post.thumbnail ? (
            <ImageSkeleton
              attrs={{
                src: post.thumbnail,
                alt: post.title,
                loading: 'eager',
                fetchPriority: 'high',
                className: styles.thumbnail,
              }}
              noImageClassName={styles.noImage}
            />
          ) : (
            <CiImageOff className={styles.noImage} size={32} />
          )}
        </div>
        <header className='content'>
          <h2 className={styles.projectTitle}>{post.title}</h2>
          <p>{post.description}</p>
          <div className={styles.projectInfoFooter}>
            <small>
              {post.date_started}~ {post.date_finished}
            </small>
            <div className={styles.projectMeta}>
              <small>{post.role}</small>
              <small>{post.head_count}인</small>
            </div>
          </div>
        </header>
      </section>
      <TagList tags={post.tags} />
    </Link>
  )
}
