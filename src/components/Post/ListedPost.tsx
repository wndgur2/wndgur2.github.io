import { FunctionComponent } from 'react'
import './ListedPost.css'
import { Link } from 'react-router-dom'
import _Post from '@/types/_Post'
import _Algorithm from '@/types/_Algorithm'
import CATEGORIES from '@/consts/CATEGORIES'
import TIER_COLOR from '@/consts/TIER_COLOR'
import MarkdownView from '@/pages/Post/MarkdownView'
import TagList from '../common/TagList'

interface ListedPostProps {
  post: _Post
}

const ListedPost: FunctionComponent<ListedPostProps> = ({ post }: ListedPostProps) => {
  return (
    <Link
      className="listed-post link clickable"
      to={`/post/${post.title}`}
    >
      <header>
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
        <MarkdownView post={post} />
      </section>
      <TagList tags={post.tags} />
    </Link>
  )
}

export default ListedPost
