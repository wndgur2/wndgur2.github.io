import TagCountList from '@/components/common/TagCountList'
import { usePostsTags } from '@/hooks/usePosts'

export default function ProfileTagCountList() {
  const tags = usePostsTags()

  return <TagCountList tags={tags} />
}
