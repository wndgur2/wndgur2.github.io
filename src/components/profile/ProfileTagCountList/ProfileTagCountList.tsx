import TagCountList from '@/components/common/TagCountList'
import { usePostsTags } from '@/hooks/usePosts'

interface Props {
  className?: string
}

export default function ProfileTagCountList({ className }: Props) {
  const tags = usePostsTags()

  return <TagCountList tags={tags} className={className} />
}
