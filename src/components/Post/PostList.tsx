import HomeCategory from '@/pages/Home/HomeCategory'
import { CATEGORIES, type IPost } from '@/types'
import PostListItem from './PostListItem'

interface Props {
  category: keyof typeof CATEGORIES
  posts: IPost[]
}

export default function PostList({ category, posts }: Props) {
  return (
    <HomeCategory category={category}>
      {posts.map((post: IPost, i: number) => (
        <PostListItem key={i} post={post} />
      ))}
    </HomeCategory>
  )
}
