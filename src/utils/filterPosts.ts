import { type PostTypes } from '@/types'

export const filterPostsBySearchKey = (
  posts: PostTypes[],
  searchKey?: string,
): PostTypes[] => {
  const searchText = searchKey?.toLowerCase()
  if (!searchText) return []

  const searchWords = searchText.split(' ')

  return searchWords.reduce((result, word) => {
    if (word.startsWith('#')) {
      return result.filter(post =>
        post.tags.map(tag => tag.toLowerCase()).includes(word.slice(1)),
      )
    } else if (word.startsWith('@')) {
      return result.filter(
        post => post.category.toLowerCase() === word.slice(1),
      )
    } else {
      return result.filter(
        post =>
          post.content.toLowerCase().includes(word) ||
          post.title.toLowerCase().includes(word),
      )
    }
  }, posts)
}
