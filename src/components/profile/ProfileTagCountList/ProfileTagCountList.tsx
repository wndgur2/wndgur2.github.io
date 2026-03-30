import { useGetAllPosts } from '@/api/post'
import TagCountList from '@/components/common/TagCountList'
import { getTagsWithCounts } from '@/utils/tag'

export default function ProfileTagCountList() {
  const { data: posts } = useGetAllPosts()

  const tags = getTagsWithCounts(posts)

  return <TagCountList tags={tags} />
}
