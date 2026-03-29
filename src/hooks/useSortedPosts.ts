import { useMemo } from 'react'

import { useStore } from '@/store'
import { type IPost } from '@/types'

export default function useSortedPosts(searchedPosts: IPost[]) {
  const sortAttribute = useStore(state => state.sortAttribute)
  const sortOrder = useStore(state => state.sortOrder)
  const toggleSortOrder = useStore(state => state.toggleSortOrder)

  const sortedPosts = useMemo(
    () =>
      [...searchedPosts].sort((a, b) =>
        sortOrder === 'desc'
          ? a[sortAttribute] < b[sortAttribute]
            ? 1
            : -1
          : a[sortAttribute] > b[sortAttribute]
            ? 1
            : -1,
      ),
    [searchedPosts, sortAttribute, sortOrder],
  )

  return { sortedPosts, sortOrder, sortAttribute, toggleSortOrder }
}
