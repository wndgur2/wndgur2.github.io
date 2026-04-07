import useSearchKey from '@/features/search/useSearchKey'
import { useSearchPosts } from './usePosts'

export default function useSearchedPosts() {
  const searchKey = useSearchKey()

  const searchedPosts = useSearchPosts(searchKey)

  return { searchedPosts, searchKey }
}
