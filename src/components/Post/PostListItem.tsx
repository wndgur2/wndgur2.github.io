import './PostListItem.css'

import { type MarkdownToJSX } from 'markdown-to-jsx'
import { Link } from 'react-router-dom'

import CATEGORIES from '@/consts/CATEGORIES'
import MarkdownView from '@/pages/PostDetail/MarkdownView'
import { type IPost } from '@/types'
import TagList from '../common/TagList'

interface Props {
  post: IPost
}

export default function PostListItem({ post }: Props) {
  const overrides: MarkdownToJSX.Overrides = {
    a: {
      component: (props: any) => <strong {...props} />,
    },
    div: {
      component: (props: any) => <span {...props} />,
    },
  }
  return (
    <Link className='post-list-item link clickable' to={`/post/${post.title}`}>
      <header className='content'>
        <h3>
          <span>{post.title}</span>
          {post.site && <small>{post.site}</small>}
          {post.number && <small>{post.number}</small>}
        </h3>
        <small>
          {post.date_started}
          {post.category === CATEGORIES.PROJECT && `~ ${post.date_finished}`}
        </small>
      </header>
      <section className='preview'>
        <MarkdownView post={post} overrides={overrides} />
      </section>
      <TagList tags={post.tags} />
    </Link>
  )
}
