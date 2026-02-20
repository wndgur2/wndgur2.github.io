import usePostsByCategory from '@/hooks/usePostsByCategory'
import HomeCategory from '@/pages/Home/HomeCategory'
import { CATEGORIES, type IPost, type TCategory } from '@/types'
import Loading from '../common/Loading'
import PostListItem from './PostListItem'

export default function PostList() {
  const posts: IPost[] = []
  const postsByCategory = usePostsByCategory(posts)

  return (
    <>
      {Array.from(postsByCategory.keys())
        .filter(key => key !== CATEGORIES.PROJECT)
        .map(category => (
          <HomeCategory key={category} category={category as TCategory}>
            {postsByCategory.get(category)?.length ? (
              postsByCategory.get(category)?.map((post: IPost, i: number) => {
                return <PostListItem key={i} post={post} />
              })
            ) : (
              <Loading phrase={`loading ${category} posts`} />
            )}
          </HomeCategory>
        ))}
    </>
  )
}
