import 'highlight.js/styles/github-dark.css'
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
            <IconLink
              icon={<IoLogoGithub size={42} />}
              url={post.github}
            />
            <small>
              {post.date_started} ~ {post.date_finished}
            </small>
          </section>
        )}
      </header>
      <main className="post-content">{post ? <MarkdownView post={post} /> : <Loading />}</main>
      <nav>
        {nextPost && (
          <Link
            to={`/post/${nextPost.title}`}
            className="clickable next"
          >
            <small>next</small>
            <div>
              <p>{nextPost.title}</p>
            </div>
          </Link>
        )}
        {prevPost && (
          <Link
            to={`/post/${prevPost.title}`}
            className="clickable prev"
          >
            <small>previous</small>
            <div>
              <p>{prevPost.title}</p>
            </div>
          </Link>
        )}
      </nav>
    </article>
  )
}

export default PostDetail
