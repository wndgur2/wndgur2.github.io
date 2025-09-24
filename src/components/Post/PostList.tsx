import { type FunctionComponent } from 'react'
import { useRecoilValue } from 'recoil'

import CATEGORIES from '@/consts/CATEGORIES'
import usePostsByCategory from '@/hooks/usePostsByCategory'
import HomeCategory from '@/pages/Home/HomeCategory'
import { postsAtom } from '@/recoil'
import { type IPost } from '@/types'
import Loading from '../common/Loading'
import PostListItem from './PostListItem'

interface PostListProps {}

const PostList: FunctionComponent<PostListProps> = () => {
  const posts = useRecoilValue(postsAtom)
  const postsByCategory = usePostsByCategory(posts)

  return (
    <>
      {Object.keys(postsByCategory)
        .filter(key => key !== CATEGORIES.PROJECT)
        .map((category: any) => (
          <HomeCategory key={category} category={category}>
            {postsByCategory[category].length ? (
              postsByCategory[category].map((post: IPost, i: number) => {
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
