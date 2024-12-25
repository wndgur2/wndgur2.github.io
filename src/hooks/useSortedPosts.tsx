import _Post from '@/types/_Post'
import { useMemo } from 'react'

export default function useSortedPosts(searchedPosts: _Post[], recentFirst: boolean) {
  return useMemo(
    () =>
      [...searchedPosts].sort((a, b) =>
        recentFirst
          ? a.date_started < b.date_started
            ? 1
            : -1
          : a.date_started > b.date_started
          ? 1
          : -1
      ),
    [searchedPosts, recentFirst]
  )
}
