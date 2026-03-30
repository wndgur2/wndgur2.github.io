import './PostListItem.css'

import { type MarkdownToJSX } from 'markdown-to-jsx'
import { Link } from 'react-router-dom'

import MarkdownView from '@/components/post/MarkdownView'
import CATEGORIES from '@/consts/CATEGORIES'
import { ROUTES } from '@/router'
import { type IPost } from '@/types'
import TagList from '../../common/TagList'

/**
 * 게시글 목록 아이템 컴포넌트
 * - 제목/날짜/미리보기/태그 정보를 표시
 * - 클릭 시 상세 페이지로 이동
 *
 * @param post 목록에서 표시할 게시글 데이터
 */

interface Props {
  post: IPost
}

export default function PostListItem({ post }: Props) {
  // 리스트 미리보기용 마크다운 태그 오버라이드
  const overrides: MarkdownToJSX.Overrides = {
    a: {
      component: (props: any) => <strong {...props} />,
    },
    div: {
      component: (props: any) => <span {...props} />,
    },
  }
  return (
    <Link
      className='post-list-item link clickable'
      to={ROUTES.POST_DETAIL(post.id)}
    >
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
