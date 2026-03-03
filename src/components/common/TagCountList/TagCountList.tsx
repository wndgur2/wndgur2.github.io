import './TagCountList.css'

import Tag from '../Tag'

/**
 * 태그 카운트 목록 컴포넌트
 * - 태그명과 해당 태그가 사용된 게시글 수를 리스트 형태로 표시
 *
 * @param tags 태그명과 해당 태그가 사용된 게시글 수를 담은 객체 배열
 */
interface Props {
  tags: { tag: string; count: number }[]
}

export default function TagCountList({ tags }: Props) {
  return (
    <ol className='tag-list'>
      {tags.map(({ tag, count }, index: number) => (
        <Tag key={`${tag}${count}${index}`} tag={tag} count={count} />
      ))}
    </ol>
  )
}
