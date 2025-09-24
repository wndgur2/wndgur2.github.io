import { selectorFamily } from 'recoil'
import { postsAtom } from '@/recoil/atoms/postsAtom'
import { type IPost } from '@/types'

export const getPostsByCategory = selectorFamily<IPost[], { category: string }>({
  key: 'getPostsByCategory',
  get:
    (params) =>
      ({ get }) => {
        const posts = get(postsAtom) // Retrieve posts from the atom
        return posts.filter((post) => post.category === params.category)
      },
})

export const getPostsBySearchKey = selectorFamily<IPost[], { searchKey?: string }>({
  key: 'getPostsBySearchKey',
  get:
    (params) =>
      ({ get }) => {
        const posts = get(postsAtom) // Retrieve posts from the atom

        const searchText = params.searchKey?.toLowerCase()
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

export const getPostByTitle = selectorFamily<IPost | undefined | null, { title?: string }>({
  key: 'getPostByTitle',
  get:
    (params) =>
      ({ get }) => {
        const posts = get(postsAtom)
        if (!posts.length) return undefined // Handle loading state

        return posts.find((post) => post.title === params.title) || null
      },
})

export const getPrevPost = selectorFamily<IPost | undefined, { title?: string }>({
  key: 'getPrevPost',
  get:
    (params) =>
      ({ get }) => {
        const posts = get(postsAtom)
        if (!posts.length) return undefined // Handle loading state

        const postIndex = posts.findIndex((post) => post.title === params.title)
        return posts[postIndex + 1]
      },
})

export const getNextPost = selectorFamily<IPost | undefined, { title?: string }>({
  key: 'getNextPost',
  get:
    (params) =>
      ({ get }) => {
        const posts = get(postsAtom)
        if (!posts.length) return undefined // Handle loading state

        const postIndex = posts.findIndex((post) => post.title === params.title)
        return posts[postIndex - 1]
      },
})
