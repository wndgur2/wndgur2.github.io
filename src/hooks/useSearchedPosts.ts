import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { usePostStore } from '@/store/post'
import { useSearchPosts } from './usePosts'

export default function useSearchedPosts() {
  const params = useParams()
  const searchKeyStored = usePostStore(state => state.searchKey)
  const setSearchKey = usePostStore(state => state.setSearchKey)

  const searchKey = params.searchKey || searchKeyStored

  useEffect(() => {
    if (searchKey) {
      setSearchKey(searchKey)
    }
  }, [searchKey, setSearchKey])

  const searchedPosts = useSearchPosts(searchKey)

  return { searchedPosts, searchKey }
}
