import { useMemo } from 'react'

import { type IPost } from '@/types'

export default function useSortedPosts(
  searchedPosts: IPost[],
  recentFirst: boolean,
) {
  return useMemo(
    () =>
      [...searchedPosts].sort((a, b) =>
        recentFirst
          ? a.date_started < b.date_started
            ? 1
            : -1
          : a.date_started > b.date_started
            ? 1
            : -1,
      ),
    [searchedPosts, recentFirst],
  )
}
