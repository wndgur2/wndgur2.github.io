import './PostListItem.css'

import type { HTMLAttributes } from 'react'
import { type MarkdownToJSX } from 'markdown-to-jsx'
import { Link } from 'react-router-dom'

import TIER_COLOR from '@/consts/TIER_COLOR'
import MarkdownView from '@/pages/PostDetail/MarkdownView'
import { CATEGORIES, type IAlgorithmSolution, type IPost } from '@/types'
import TagList from '../common/TagList'

interface PostListItemProps {
  post: IPost
}

export default function PostListItem({ post }: PostListItemProps) {
  const overrides: MarkdownToJSX.Overrides = {
    a: {
      component: (props: HTMLAttributes<HTMLAnchorElement>) => (
        <strong {...props} />
      ),
    },
    div: {
      component: (props: HTMLAttributes<HTMLDivElement>) => <span {...props} />,
    },
  }
  return (
    <Link className='post-list-item link clickable' to={`/post/${post.title}`}>
      <header className='content'>
        <h3>
          <span>{post.title}</span>
          {post.site && <small>{post.site}</small>}
          {post.number && <small>{post.number}</small>}
          {post.level && (
            <small
              style={{ color: TIER_COLOR[(post as IAlgorithmSolution).level] }}
            >
              {post.level}
            </small>
          )}
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
