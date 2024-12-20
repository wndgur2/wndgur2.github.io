import { FunctionComponent } from 'react'
import './TagCountList.css'
import Tag from './Tag'

interface TagCountListProps {
  tags: { tag: string; count: number }[]
}

const TagCountList: FunctionComponent<TagCountListProps> = ({ tags }: TagCountListProps) => {
  return (
    <ol className="tag-list">
      {tags.map(({ tag, count }, index: number) => (
        <Tag
          key={`${tag}${count}${index}`}
          tag={tag}
          count={count}
        />
      ))}
    </ol>
  )
}

export default TagCountList
