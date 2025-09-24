import { type FunctionComponent } from 'react'

import './ProjectListItem.css'

import { CiImageOff } from 'react-icons/ci'
import { Link } from 'react-router-dom'

import { type IPost } from '@/types'
import TagList from '../common/TagList'
import ImageSkeleton from './ImageSkeleton'

interface ProjectListItemProps {
  post: IPost
}
const ProjectListItem: FunctionComponent<ProjectListItemProps> = ({ post }) => {
  return (
    <Link
      to={`/post/${post.title}`}
      className='post-list-item project link clickable'
    >
      <section>
        <div className='project-image-wrapper'>
          {post.thumbnail ? (
            <ImageSkeleton props={{ src: post.thumbnail, alt: post.title }} />
          ) : (
            <CiImageOff className='no-image' size={32} />
          )}
        </div>
        <header className='project-info content'>
          <h2 className='project-title'>{post.title}</h2>
          <p>{post.description}</p>
          <div className='project-info-footer'>
            <small>
              {post.date_started}~ {post.date_finished}
            </small>
            <div className='project-meta'>
              <small>{post.role}</small>
              <small>{post.head_count}인</small>
            </div>
          </div>
        </header>
      </section>
      <TagList tags={post.tags} />
    </Link>
  )
}

export default ProjectListItem
