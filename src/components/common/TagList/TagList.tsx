import Tag from '../Tag'

/**
 * 태그 목록 컴포넌트
 *
 * @param tags - 게시글에 달린 태그 문자열 배열
 */

interface Props {
  tags: string[]
}

export default function TagList({ tags }: Props) {
  return (
    <ol className='tag-list'>
      {tags.map((tag: string, index: number) => (
        <Tag key={index} tag={tag} />
      ))}
    </ol>
  )
}
