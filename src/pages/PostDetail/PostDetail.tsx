import './PostDetail.css'
import { FunctionComponent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IoLogoGithub } from 'react-icons/io'
import { useRecoilValue } from 'recoil'
import { postSelector } from '@/recoil'
import Loading from '@/components/common/Loading'
import useResetScroll from '@/hooks/useResetScroll'
import IconLink from '@/components/IconLink/IconLink'
import MarkdownView from './MarkdownView'
import TagList from '@/components/common/TagList'
import { nextPostSelector, prevPostSelector } from '@/recoil/selectors/postsSelector'

const PostDetail: FunctionComponent = () => {
  const title = useParams().post_title
  const post = useRecoilValue(postSelector({ post_title: title }))
  const prevPost = useRecoilValue(prevPostSelector({ post_title: title }))
  const nextPost = useRecoilValue(nextPostSelector({ post_title: title }))
  useResetScroll(post)

  return (
    <article className="post">
      <header>
        <section className="post-title">
          {post && (
            <Link
              to={`/search/@${post.category}`}
              className="minor post-category"
              state={{ search_text: `@${post.category}` }}
            >
              {post.category[0].toUpperCase() + post.category.slice(1)}
            </Link>
          )}
          <h2>{title}</h2>
          <TagList tags={post?.tags || []} />
        </section>
        {post && (
          <section className="post-meta">
            <IconLink icon={<IoLogoGithub size={42} />} url={post.github} />
            <small>
              {post.date_started} ~ {post.date_finished}
            </small>
          </section>
        )}
      </header>
      <main className="post-content">
        {post === null ? (
          <span>게시글 '{title}' 을 찾을 수 없어요.</span>
        ) : post === undefined ? (
          <Loading />
        ) : (
          <MarkdownView post={post} />
        )}
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
        <Link to={`/search/@${post?.category}`} className="clickable list">
          <div>목록</div>
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

export default PostDetail
