import { useMemo } from 'react'

import { usePostStore } from '@/store/post'
import { type IPost } from '@/types'

export default function useSortedPosts(posts: IPost[]) {
  const sortAttribute = usePostStore(state => state.sortAttribute)
  const sortOrder = usePostStore(state => state.sortOrder)
  const toggleSortOrder = usePostStore(state => state.toggleSortOrder)

  const sortedPosts = useMemo(
    () =>
      [...posts].sort((a, b) =>
        sortOrder === 'desc'
          ? a[sortAttribute] < b[sortAttribute]
            ? 1
            : -1
          : a[sortAttribute] > b[sortAttribute]
            ? 1
            : -1,
      ),
    [posts, sortAttribute, sortOrder],
  )

  return { sortedPosts, sortOrder, sortAttribute, toggleSortOrder }
}
