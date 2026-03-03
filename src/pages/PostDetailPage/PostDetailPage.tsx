import './PostDetailPage.css'

import { IoLogoGithub } from 'react-icons/io'
import { Link, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import IconLink from '@/components/common/IconLink'
import TagList from '@/components/common/TagList'
import MarkdownView from '@/components/post/MarkdownView'
import useResetScroll from '@/hooks/useResetScroll'
import { ROUTES } from '@/router'
import { getPostByTitle } from '@/store'
import { getNextPost, getPrevPost } from '@/store/selectors/postsSelector'

/**
 * 게시글 상세 페이지 컴포넌트
 * - URL 파라미터(title)로 게시글 조회
 * - 이전글/다음글 네비게이션 제공
 * - 본문 마크다운 렌더링
 */
export default function PostDetailPage() {
  // 현재 게시글 및 이전/다음 게시글 조회
  const title = useParams().title
  const post = useRecoilValue(getPostByTitle({ title }))
  const prevPost = useRecoilValue(getPrevPost({ title }))
  const nextPost = useRecoilValue(getNextPost({ title }))

  useResetScroll(title)

  if (!post) {
    return (
      <div>
        <p>{title} 게시글을 찾을 수 없어요.</p>
        <Link to={ROUTES.HOME} className='clickable'>
          <b>홈으로 돌아가기</b>
        </Link>
      </div>
    )
  }

  return (
    <article className='post'>
      <header>
        <section className='post-title'>
          {post && (
            <Link
              to={ROUTES.SEARCH(`@${post.category}`)}
              className='minor post-category'
            >
              {post.category[0].toUpperCase() + post.category.slice(1)}
            </Link>
          )}
          <h2>{title}</h2>
          <TagList tags={post?.tags || []} />
        </section>
        {post && (
          <section className='post-meta'>
            <IconLink icon={<IoLogoGithub size={42} />} url={post.github} />
            <small>
              {post.date_started} ~ {post.date_finished}
            </small>
          </section>
        )}
      </header>
      <main className='post-content'>
        <MarkdownView post={post} />
      </main>
      <nav>
        {
          <Link
            to={nextPost ? `/post/${nextPost.title}` : '#'}
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
          to={prevPost ? `/post/${prevPost.title}` : '#'}
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
