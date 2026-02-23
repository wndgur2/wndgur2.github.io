import { useContext } from 'react'

import { GithubContext } from '@/contexts/GithubContext'
import HomeCategory from '@/pages/Home/HomeCategory'
import { CATEGORIES, type IPost } from '@/types'
import PostListItem from './PostListItem'

export default function PostList() {
  const { studies, algorithmSolutions } = useContext(GithubContext)

  return (
    <>
      {!!studies && (
        <HomeCategory category={CATEGORIES.STUDY}>
          {studies.map((post: IPost, i: number) => (
            <PostListItem key={i} post={post} />
          ))}
        </HomeCategory>
      )}
      {!!algorithmSolutions && (
        <HomeCategory category={CATEGORIES.ALGORITHM}>
          {algorithmSolutions.map((post: IPost, i: number) => (
            <PostListItem key={i} post={post} />
          ))}
        </HomeCategory>
      )}
    </>
  )
}
