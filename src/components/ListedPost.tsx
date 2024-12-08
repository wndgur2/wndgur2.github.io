import { FunctionComponent } from 'react'
import './ListedPost.css'
import Tag from './Tag'
import { Link } from 'react-router-dom'
import { _Algorithm, _Post } from '../types/_Post'
import CATEGORIES from '../consts/CATEGORIES'
import Markdown from 'markdown-to-jsx'
import TIER_COLOR from '../consts/TIER_COLOR'

interface ListedPostProps {
  post: _Post
}

const ListedPost: FunctionComponent<ListedPostProps> = ({ post }: ListedPostProps) => {
  return (
    <Link
      className='listed-post link clickable'
      to={ `/post/${post.title}` }
    >
      <header >
        <h3>
          <span>{ post.title }</span>
          { post.site && <small>{ post.site }</small> }
          { post.number && <small>{ post.number }</small> }
          { post.level && (
            <small style={ { color: TIER_COLOR[(post as _Algorithm).level] } }>{ post.level }</small>
          ) }
        </h3>
        { post.category === CATEGORIES.PROJECT ? (
          <small>
            { post.date_started }~ { post.date_finished }
          </small>
        ) : (
          <small>{ post.date_started }</small>
        ) }
      </header>
      <section className='preview'>
        <Markdown
          options={ {
            overrides: {
              a: { component: (props: any) => <span { ...props } /> },
              Integer: { component: (props: any) => <span { ...props } /> },
              img: { component: (props: any) => <img { ...props } alt={ props.alt } style={ { maxWidth: '100%', maxHeight: '8em', objectFit: 'contain', } } /> },
            }
          } }
        >
          { post.content + (post.code ? post.code : '') }
        </Markdown>
      </section>
      <ol className='tags'>
        { post.tags.map((tag, index) => (
          <Tag
            key={ index }
            tag={ tag }
          />
        )) }
      </ol>
    </Link >
  )
}

export default ListedPost
