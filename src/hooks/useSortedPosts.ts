import { useMemo } from 'react'

import { sortPosts } from '@/features/post/selectors'
import { usePostStore } from '@/store/post'
import { type IPost } from '@/types'

export default function useSortedPosts(posts: IPost[]) {
  const sortAttribute = usePostStore(state => state.sortAttribute)
  const sortOrder = usePostStore(state => state.sortOrder)
  const toggleSortOrder = usePostStore(state => state.toggleSortOrder)

  const sortedPosts = useMemo(
    () => sortPosts(posts, sortAttribute, sortOrder),
    [posts, sortAttribute, sortOrder],
  )

  return { sortedPosts, sortOrder, sortAttribute, toggleSortOrder }
}
