import { type PostTypes } from '@/types'

export const filterPostsBySearchKey = (
  posts: PostTypes[],
  searchKey?: string,
): PostTypes[] => {
  if (!searchKey) return []

  const words = searchKey.toLowerCase().split(' ')

  return posts.filter(post => {
    const title = post.title.toLowerCase()
    const content = post.content.toLowerCase()
    const tags = post.tags.map(tag => tag.toLowerCase())
    const category = post.category.toLowerCase()

    return words.every(word => {
      if (word.startsWith('#')) {
        return tags.includes(word.slice(1))
      }

      if (word.startsWith('@')) {
        return category === word.slice(1)
      }

      return title.includes(word) || content.includes(word)
    })
  })
}
