import './TagList.css'

import Tag from './Tag'

interface TagListProps {
  tags: string[]
}

export default function TagList({ tags }: TagListProps) {
  return (
    <ol className='tag-list'>
      {tags.map((tag: string, index: number) => (
        <Tag key={index} label={tag} />
      ))}
    </ol>
  )
}
