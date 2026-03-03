import './TagCountList.css'

import Tag from '../Tag'

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
