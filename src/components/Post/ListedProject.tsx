import { FunctionComponent } from 'react'
import Tag from '@/components/common/Tag'
import './ListedProject.css'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'
import { CiImageOff } from 'react-icons/ci'
import _Project from '@/types/_Project'

interface ListedProjectProps {
  post: _Project
}

const ListedProject: FunctionComponent<ListedProjectProps> = ({ post }) => {
  return (
    <Link
      to={ `/post/${post.title}` }
      className='listed-post project link clickable'
    >
      <section>
        <div className='project-image-wrapper'>
          { post.thumbnail ? (
            parse(post.thumbnail)
          ) : (
            <CiImageOff
              className='no-image'
              size={ 32 }
            />
          ) }
        </div>
        <div className='project-info content'>
          <h2 className='project-title'>{ post.title }</h2>
          <p>{ post.description }</p>
          <small className='project-date'>
            { post.date_started }~ { post.date_finished }
          </small>
        </div>
      </section>
      <ol className='tags'>
        { post.tags.map((tag: string, index: number) => (
          <Tag
            key={ index }
            tag={ tag }
          />
        )) }
      </ol>
    </Link>
  )
}

export default ListedProject
