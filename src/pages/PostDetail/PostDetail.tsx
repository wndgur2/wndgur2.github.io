import './PostDetail.css'

import { type FunctionComponent } from 'react'
import { IoLogoGithub } from 'react-icons/io'
import { Link, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import Loading from '@/components/common/Loading'
import TagList from '@/components/common/TagList'
import IconLink from '@/components/IconLink/IconLink'
import useResetScroll from '@/hooks/useResetScroll'
import { getPostByTitle } from '@/recoil'
import { getNextPost, getPrevPost } from '@/recoil/selectors/postsSelector'
import MarkdownView from './MarkdownView'

const PostDetail: FunctionComponent = () => {
  const title = useParams().title
  const post = useRecoilValue(getPostByTitle({ title: title }))
  const prevPost = useRecoilValue(getPrevPost({ title: title }))
  const nextPost = useRecoilValue(getNextPost({ title: title }))
  useResetScroll(post)

  return (
    <article className='post'>
      <header>
        <section className='post-title'>
          {post && (
            <Link
              to={`/search/@${post.category}`}
              className='minor post-category'
              state={{ searchKey: `@${post.category}` }}
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
        {post === null ? (
          <span>게시글 &apos;{title}&apos; 을 찾을 수 없어요.</span>
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
        <Link to={`/search/@${post?.category}`} className='clickable list'
          state={{ searchKey: `@${post?.category}` }}
        >
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

export default PostDetail
