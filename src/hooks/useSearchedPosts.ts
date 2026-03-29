import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getPostsBySearchKey, useStore } from '@/store'

export default function useSearchedPosts() {
  const params = useParams()
  const posts = useStore(state => state.posts)
  const searchKeyStored = useStore(state => state.searchKey)
  const setSearchKey = useStore(state => state.setSearchKey)

  const searchKey = params.searchKey || searchKeyStored

  useEffect(() => {
    if (searchKey) {
      setSearchKey(searchKey)
    }
  }, [searchKey, setSearchKey])

  const searchedPosts = getPostsBySearchKey(posts, searchKey)

  return { searchedPosts, searchKey }
}
