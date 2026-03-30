import './PostDetailPage.css'

import { IoLogoGithub } from 'react-icons/io'
import { Link, Navigate, useParams } from 'react-router-dom'

import IconLink from '@/components/common/IconLink'
import TagList from '@/components/common/TagList'
import MarkdownView from '@/components/post/MarkdownView'
import { usePostDetail } from '@/hooks/usePosts'
import useResetScroll from '@/hooks/useResetScroll'
import { ROUTES } from '@/router'

/**
 * 게시글 상세 페이지 컴포넌트
 * - URL 파라미터(title)로 게시글 조회
 * - 이전글/다음글 네비게이션 제공
 * - 본문 마크다운 렌더링
 */
export default function PostDetailPage() {
  // 현재 게시글 및 이전/다음 게시글 조회
  const id = useParams().id
  useResetScroll(id)

  const { postId, post, prevPost, nextPost } = usePostDetail(id)

  if (!postId || !post) return <Navigate to='/404' replace />

  return (
    <article className='post'>
      <header>
        <section className='post-title'>
          <Link
            to={ROUTES.SEARCH(`@${post.category}`)}
            className='minor post-category'
          >
            {post.category[0].toUpperCase() + post.category.slice(1)}
          </Link>
          <h2>{post.title}</h2>
          <TagList tags={post.tags} />
        </section>
        <section className='post-meta'>
          <IconLink icon={<IoLogoGithub size={42} />} url={post.github} />
          <small>
            {post.date_started} ~ {post.date_finished}
          </small>
        </section>
      </header>
      <main className='post-content'>
        <MarkdownView post={post} />
      </main>
      <nav>
        {
          <Link
            to={nextPost ? `/post/${nextPost.id}` : '#'}
            className={nextPost ? 'clickable next' : 'disabled next'}
          >
            <small>&lt; next</small>
            <div>
              <p>{nextPost ? nextPost.title : '마지막 글이에요.'}</p>
            </div>
          </Link>
        }
        <Link to={`/search`} className='clickable list'>
          <div>목록으로</div>
        </Link>
        <Link
          to={prevPost ? `/post/${prevPost.id}` : '#'}
          className={prevPost ? 'clickable prev' : 'disabled prev'}
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
