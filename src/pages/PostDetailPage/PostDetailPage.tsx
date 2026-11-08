import styles from './PostDetailPage.module.css'

import { IoLogoGithub } from 'react-icons/io'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'

import IconLink from '@/components/common/IconLink'
import TagList from '@/components/common/TagList'
import MarkdownView from '@/components/post/MarkdownView'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { usePostDetail } from '@/hooks/usePosts'
import useRemovePrerender from '@/hooks/useRemovePrerender'
import useResetScroll from '@/hooks/useResetScroll'
import { ROUTES } from '@/router'

/**
 * 게시글 상세 페이지 컴포넌트
 * - URL 파라미터(id)로 게시글 조회, 기존 해시 URL은 slug URL로 이동
 * - 이전글/다음글 네비게이션 제공
 * - 본문 마크다운 렌더링
 */
export default function PostDetailPage() {
  const location = useLocation()
  // 현재 게시글 및 이전/다음 게시글 조회
  const id = useParams().id
  useResetScroll(id)
  useRemovePrerender()

  const { postId, post, prevPost, nextPost } = usePostDetail(id)
  useDocumentTitle(post?.title)

  if (!postId || !post) return <Navigate to='/404' replace />
  if (postId !== id) return <Navigate to={ROUTES.POST_DETAIL(postId)} replace />

  const fallbackSearchKey = `@${post.category}`
  const locationState = location.state as { fromSearchKey?: string } | null
  const listTargetSearchKey = locationState?.fromSearchKey || fallbackSearchKey
  const encodedCategorySearchKey = encodeURIComponent(`@${post.category}`)
  const encodedListTargetSearchKey = encodeURIComponent(listTargetSearchKey)

  return (
    <article className={styles.post}>
      <header>
        <section className={styles.postTitle}>
          <Link
            to={ROUTES.SEARCH(encodedCategorySearchKey)}
            className={`minor ${styles.postCategory}`}
          >
            {post.category[0].toUpperCase() + post.category.slice(1)}
          </Link>
          <h1>{post.title}</h1>
          <TagList tags={post.tags} />
        </section>
        <section className={styles.postMeta}>
          <IconLink
            icon={<IoLogoGithub size={42} />}
            label='Github 저장소'
            url={post.github}
          />
          <small>
            {post.date_started} ~ {post.date_finished}
          </small>
        </section>
      </header>
      <main className={styles.postContent}>
        <MarkdownView post={post} />
      </main>
      <nav>
        {
          <Link
            to={nextPost ? `/post/${nextPost.id}` : '#'}
            className={`${nextPost ? 'clickable' : styles.disabled} ${styles.next}`}
          >
            <small>&lt; next</small>
            <div>
              <p>{nextPost ? nextPost.title : '마지막 글이에요.'}</p>
            </div>
          </Link>
        }
        <Link
          to={ROUTES.SEARCH(encodedListTargetSearchKey)}
          className={`clickable ${styles.list}`}
        >
          <div>목록으로</div>
        </Link>
        <Link
          to={prevPost ? `/post/${prevPost.id}` : '#'}
          className={`${prevPost ? 'clickable' : styles.disabled} ${styles.prev}`}
        >
          <small>previous &gt; </small>
          <div>
            <p>{prevPost ? prevPost.title : '첫 번째 글이에요.'}</p>
          </div>
        </Link>
      </nav>
    </article>
  )
}
