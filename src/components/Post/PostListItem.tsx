import { FunctionComponent, useEffect } from 'react'
import './PostListItem.css'
import { Link } from 'react-router-dom'
import _Post from '@/types/_Post'
import _Algorithm from '@/types/_Algorithm'
import CATEGORIES from '@/consts/CATEGORIES'
import TIER_COLOR from '@/consts/TIER_COLOR'
import MarkdownView from '@/pages/PostDetail/MarkdownView'
import TagList from '../common/TagList'
import { MarkdownToJSX } from 'markdown-to-jsx'

interface PostListItemProps {
  post: _Post
}

const PostListItem: FunctionComponent<PostListItemProps> = ({ post }: PostListItemProps) => {
  const overrides: MarkdownToJSX.Overrides = {
    a: {
      component: (props: any) => <strong {...props} />,
    },
    div: {
      component: (props: any) => <span {...props} />,
    },
  }
  return (
    <Link
      className="post-list-item link clickable"
      to={`/post/${post.title}`}
    >
      <header className="content">
        <h3>
          <span>{post.title}</span>
          {post.site && <small>{post.site}</small>}
          {post.number && <small>{post.number}</small>}
          {post.level && (
            <small style={{ color: TIER_COLOR[(post as _Algorithm).level] }}>{post.level}</small>
          )}
        </h3>
        <small>
          {post.date_started}
          {post.category === CATEGORIES.PROJECT && `~ ${post.date_finished}`}
        </small>
      </header>
      <section className="preview">
        <MarkdownView
          post={post}
          overrides={overrides}
        />
      </section>
      <TagList tags={post.tags} />
    </Link>
  )
}

export default PostListItem
