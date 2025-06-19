import CATEGORIES from '@/consts/CATEGORIES'
import usePostsByCategory from '@/hooks/usePostsByCategory'
import HomeCategory from '@/pages/Home/HomeCategory'
import { postsAtom } from '@/recoil'
import _Post from '@/types/_Post'
import { FunctionComponent } from 'react'
import { useRecoilValue } from 'recoil'
import Loading from '../common/Loading'
import PostListItem from './PostListItem'

interface PostListProps {}

const PostList: FunctionComponent<PostListProps> = () => {
  const posts = useRecoilValue(postsAtom)
  const postsByCategory = usePostsByCategory(posts)

  return (
    <>
      {Object.keys(postsByCategory)
        .filter((key) => key !== CATEGORIES.PROJECT)
        .map((category: any) => (
          <HomeCategory key={category} category={category}>
            {postsByCategory[category].length ? (
              postsByCategory[category].map((post: _Post, i: number) => {
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

export default PostList
