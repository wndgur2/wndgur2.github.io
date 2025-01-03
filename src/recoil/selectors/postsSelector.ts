import { selectorFamily } from 'recoil'
import { postsAtom } from '@/recoil/atoms/postsAtom'
import _Post from '@/types/_Post'

export const searchedPostsSelector = selectorFamily<_Post[], { search_text?: string }>({
  key: 'searchedPostsSelector',
  get:
    (params) =>
    ({ get }) => {
      const posts = get(postsAtom) // Retrieve posts from the atom

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

      return result
    },
})

export const postSelector = selectorFamily<_Post | undefined | null, { post_title?: string }>({
  key: 'postSelector',
  get:
    (params) =>
    ({ get }) => {
      const posts = get(postsAtom)
      if (!posts.length) return undefined // Handle loading state

      return posts.find((post) => post.title === params.post_title) || null
    },
})

export const prevPostSelector = selectorFamily<_Post | undefined, { post_title?: string }>({
  key: 'prevPostSelector',
  get:
    (params) =>
    ({ get }) => {
      const posts = get(postsAtom)
      if (!posts.length) return undefined // Handle loading state

      const postIndex = posts.findIndex((post) => post.title === params.post_title)
      return posts[postIndex + 1]
    },
})

export const nextPostSelector = selectorFamily<_Post | undefined, { post_title?: string }>({
  key: 'nextPostSelector',
  get:
    (params) =>
    ({ get }) => {
      const posts = get(postsAtom)
      if (!posts.length) return undefined // Handle loading state

      const postIndex = posts.findIndex((post) => post.title === params.post_title)
      return posts[postIndex - 1]
    },
})
