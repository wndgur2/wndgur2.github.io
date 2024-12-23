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

export const postSelector = selectorFamily<_Post | undefined, { post_title?: string }>({
  key: 'postSelector',
  get:
    (params) =>
    ({ get }) => {
      const posts = get(postsAtom)
      // console.log(posts) // TODO : posts가 아직 다 로드되지 않았을 때, loading 반환
      // 현재 undefined 반환했을 때, 로딩중인지, 없는 post인지 구분할 수 없음
      return posts.find((post) => post.title === params.post_title)
    },
})

export const prevPostSelector = selectorFamily<_Post | undefined, { post_title?: string }>({
  key: 'prevPostSelector',
  get:
    (params) =>
    ({ get }) => {
      const posts = get(postsAtom)
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
      const postIndex = posts.findIndex((post) => post.title === params.post_title)
      return posts[postIndex - 1]
    },
})
