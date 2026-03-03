import { useMemo } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { sortAttributeAtom, sortOrderAtom } from '@/store/atoms/searchAtom'
import { type IPost } from '@/types'

export default function useSortedPosts(searchedPosts: IPost[]) {
  const sortAttribute = useRecoilValue(sortAttributeAtom)
  const sortOrder = useRecoilValue(sortOrderAtom)
  const setSortOrder = useSetRecoilState(sortOrderAtom)

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

  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
  }

  return { sortedPosts, sortOrder, sortAttribute, toggleSortOrder }
}
