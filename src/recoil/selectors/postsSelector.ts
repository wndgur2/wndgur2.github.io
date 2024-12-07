import { selectorFamily } from 'recoil'
import { postsAtom } from '@/recoil/atoms/postsAtom'
import { _Post } from '@/types/_Post'

export const searchedPostsSelector = selectorFamily<_Post[], { search_text?: string }>({
  key: 'searchedPostsSelector',
  get:
    (params) =>
    ({ get }) => {
      const posts = get(postsAtom) // Retrieve posts from the atom

      console.log('posts:', posts)
      const searchText = params.search_text?.toLowerCase()
      if (!searchText) return []

      const searchWords = searchText.split(' ')

      const result = searchWords.reduce((result, word) => {
        if (word.startsWith('#')) {
          return result.filter((post) =>
            post.tags.map((tag) => tag.toLowerCase()).includes(word.slice(1))
          )
        } else if (word.startsWith('@')) {
          return result.filter((post) => post.category.toLowerCase() === word.slice(1))
        } else {
          return result.filter(
            (post) =>
              post.content.toLowerCase().includes(word) || post.title.toLowerCase().includes(word)
          )
        }
      }, posts)

      console.log('search result: ', result)

      // Apply the same filtering logic
      return result
    },
})

export const postSelector = selectorFamily<_Post | undefined, { post_title?: string }>({
  key: 'postSelector',
  get:
    (params) =>
    ({ get }) => {
      const posts = get(postsAtom)
      return posts.find((post) => post.title === params.post_title)
    },
})
