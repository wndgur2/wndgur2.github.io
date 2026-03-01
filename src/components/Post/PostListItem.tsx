import './PostListItem.css'

import type { HTMLAttributes } from 'react'
import type { MarkdownToJSX } from 'markdown-to-jsx'
import { Link } from 'react-router-dom'

import MarkdownView from '@/pages/PostDetail/MarkdownView'
import { type IPost, type IProject } from '@/types'
import { dateToString } from '@/utils/dateToString'
import TagList from '../common/TagList'

interface Props {
  post: IPost | IProject
}

export default function PostListItem({ post }: Props) {
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
        </h3>
        <small>
          {dateToString(post.date_started)}
          {'date_finished' in post && `~ ${dateToString(post.date_finished)}`}
        </small>
      </header>
      <section className='preview'>
        <MarkdownView post={post} overrides={overrides} />
      </section>
      <TagList tags={post.tags} />
    </Link>
  )
}
