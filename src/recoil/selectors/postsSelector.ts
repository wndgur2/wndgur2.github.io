import { selectorFamily } from 'recoil'

import { postsAtom } from '@/recoil/atoms/postsAtom'
import { type IPost, type PostTypes } from '@/types'
import { filterPostsBySearchKey } from '@/utils/filterPosts'

export const getPostsByCategory = selectorFamily<IPost[], { category: string }>(
  {
    key: 'getPostsByCategory',
    get:
      params =>
      ({ get }) => {
        const posts = get(postsAtom) // Retrieve posts from the atom
        return posts.filter(post => post.category === params.category)
      },
  },
)

export const getPostsBySearchKey = selectorFamily<
  PostTypes[],
  { searchKey?: string }
>({
  key: 'getPostsBySearchKey',
  get:
    params =>
    ({ get }) => {
      const posts = get(postsAtom) // Retrieve posts from the atom
      return filterPostsBySearchKey(posts, params.searchKey)
    },
})

export const getPostByTitle = selectorFamily<
  IPost | undefined | null,
  { title?: string }
>({
  key: 'getPostByTitle',
  get:
    params =>
    ({ get }) => {
      const posts = get(postsAtom)
      if (!posts.length) return undefined // Handle loading state

      return posts.find(post => post.title === params.title) || null
    },
})

export const getPrevPost = selectorFamily<
  IPost | undefined,
  { title?: string }
>({
  key: 'getPrevPost',
  get:
    params =>
    ({ get }) => {
      const posts = get(postsAtom)
      if (!posts.length) return undefined // Handle loading state

      const postIndex = posts.findIndex(post => post.title === params.title)
      return posts[postIndex + 1]
    },
})

export const getNextPost = selectorFamily<
  IPost | undefined,
  { title?: string }
>({
  key: 'getNextPost',
  get:
    params =>
    ({ get }) => {
      const posts = get(postsAtom)
      if (!posts.length) return undefined // Handle loading state

      const postIndex = posts.findIndex(post => post.title === params.title)
      return posts[postIndex - 1]
    },
})
