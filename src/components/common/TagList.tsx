import './TagList.css'

import Tag from './Tag'

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
