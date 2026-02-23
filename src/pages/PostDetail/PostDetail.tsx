import { useContext } from 'react'

import './PostDetail.css'

import { IoLogoGithub } from 'react-icons/io'
import { Link, useParams } from 'react-router-dom'

import Loading from '@/components/common/Loading'
import TagList from '@/components/common/TagList'
import IconLink from '@/components/IconLink/IconLink'
import { GithubContext } from '@/contexts/GithubContext'
import { dateToString } from '@/utils/dateToString'
import MarkdownView from './MarkdownView'

export default function PostDetail() {
  const title = useParams().title
  const post = useContext(GithubContext).getPostByTitle(title || '')
  // const prevPost = {}
  // const nextPost = {}

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
              {dateToString(post.date_started)} ~{' '}
              {'date_finished' in post && dateToString(post.date_finished)}
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
      {/* <nav>
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
        <Link
          to={`/search/@${post?.category}`}
          className='clickable list'
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
      </nav> */}
    </article>
  )
}
