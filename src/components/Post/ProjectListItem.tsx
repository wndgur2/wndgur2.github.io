import './ProjectListItem.css'

import { CiImageOff } from 'react-icons/ci'
import { Link } from 'react-router-dom'

import { type IProject } from '@/types'
import { dateToString } from '@/utils/dateToString'
import TagList from '../common/TagList'
import ImageSkeleton from './ImageSkeleton'

interface ProjectListItemProps {
  project: IProject
}
export default function ProjectListItem({ project }: ProjectListItemProps) {
  return (
    <Link
      to={`/post/${project.title}`}
      className='post-list-item project link clickable'
    >
      <section>
        <div className='project-image-wrapper'>
          {project.thumbnail ? (
            <ImageSkeleton
              props={{ src: project.thumbnail, alt: project.title }}
            />
          ) : (
            <CiImageOff className='no-image' size={32} />
          )}
        </div>
        <header className='project-info content'>
          <h2 className='project-title'>{project.title}</h2>
          <p>{project.description}</p>
          <div className='project-info-footer'>
            <small>
              {dateToString(project.date_started)}~{' '}
              {dateToString(project.date_finished)}
            </small>
          </div>
        </header>
      </section>
      <TagList tags={project.tags} />
    </Link>
  )
}
