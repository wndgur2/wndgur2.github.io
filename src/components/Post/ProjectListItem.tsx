import { FunctionComponent } from 'react'
import './ProjectListItem.css'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'
import { CiImageOff } from 'react-icons/ci'
import _Project from '@/types/_Project'
import TagList from '../common/TagList'

interface ProjectListItemProps {
  post: _Project
}

const ProjectListItem: FunctionComponent<ProjectListItemProps> = ({ post }) => {
  return (
    <Link
      to={`/post/${post.title}`}
      className="listed-post project link clickable"
    >
      <section>
        <div className="project-image-wrapper">
          {post.thumbnail ? (
            parse(post.thumbnail)
          ) : (
            <CiImageOff
              className="no-image"
              size={32}
            />
          )}
        </div>
        <div className="project-info content">
          <h2 className="project-title">{post.title}</h2>
          <p>{post.description}</p>
          <small className="project-date">
            {post.date_started}~ {post.date_finished}
          </small>
        </div>
      </section>
      <TagList tags={post.tags} />
    </Link>
  )
}

export default ProjectListItem
