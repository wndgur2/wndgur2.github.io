import './TagCountList.css'

import type { ITag } from '@/types'
import Tag from './Tag'

interface TagCountListProps {
  tags: ITag[]
}

export default function TagCountList({ tags }: TagCountListProps) {
  return (
    <ol className='tag-list'>
      {tags.map(({ label, count }, index: number) => (
        <Tag key={`${label}${count}${index}`} label={label} count={count} />
      ))}
    </ol>
  )
}
