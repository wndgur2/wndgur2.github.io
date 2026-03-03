import './ProjectListItem.css'

import { CiImageOff } from 'react-icons/ci'
import { Link } from 'react-router-dom'

import { ROUTES } from '@/router'
import { type IPost } from '@/types'
import TagList from '../../common/TagList'
import ImageSkeleton from '../ImageSkeleton'

/**
 * 프로젝트 목록 아이템 컴포넌트
 * - 썸네일/요약/메타 정보를 카드 형태로 표시
 * - 클릭 시 상세 페이지로 이동
 *
 * @param post 목록에서 표시할 프로젝트 게시글 데이터
 */

interface Props {
  post: IPost
}

export default function ProjectListItem({ post }: Props) {
  return (
    <Link
      to={ROUTES.POST_DETAIL(post.title)}
      className='post-list-item project link clickable'
    >
      <section>
        <div className='project-image-wrapper'>
          {post.thumbnail ? (
            <ImageSkeleton attrs={{ src: post.thumbnail, alt: post.title }} />
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
