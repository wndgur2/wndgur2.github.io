import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { getPostsBySearchKey } from '@/store'
import { searchKeyAtom } from '@/store/atoms/searchAtom'

export default function useSearchedPosts() {
  const params = useParams()
  const searchKeyStored = useRecoilValue(searchKeyAtom)
  const setSearchKey = useSetRecoilState(searchKeyAtom)

  const searchKey = params.searchKey || searchKeyStored

  useEffect(() => {
    if (searchKey) {
      setSearchKey(searchKey)
    }
  }, [searchKey, setSearchKey])

  const searchedPosts = useRecoilValue(getPostsBySearchKey({ searchKey }))

  return { searchedPosts, searchKey }
}
