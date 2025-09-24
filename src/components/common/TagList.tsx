import { type FunctionComponent } from 'react'

import './TagList.css'

import Tag from './Tag'

interface TagListProps {
  tags: string[]
}

const TagList: FunctionComponent<TagListProps> = ({ tags }: TagListProps) => {
  return (
    <ol className='tag-list'>
      {tags.map((tag: string, index: number) => (
        <Tag key={index} tag={tag} />
      ))}
    </ol>
  )
}

export default TagList
