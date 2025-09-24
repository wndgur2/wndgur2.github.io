import { useMemo } from 'react'
import { type Params } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { postsAtom } from '@/recoil'
import { type IPost } from '@/types'

function useSearchPosts(params: Readonly<Params<string>>) {
  const posts = useRecoilValue(postsAtom)

  const searchedPosts: IPost[] = useMemo(() => {
    if (!params.searchKey) return []
    const searchKey = params.searchKey.toLowerCase() as string
    const search_words = searchKey.split(' ') as string[]

    let result = posts
    search_words.forEach(word => {
      result = result.filter((post: IPost) => {
        if (word.startsWith('#'))
          // tag search
          return post.tags.map(tag => tag.toLowerCase()).includes(word.slice(1))
        else if (word.startsWith('@'))
          // category search
          return post.category.toLowerCase() === word.slice(1)
        // title or content search
        else return (post.content + post.title).toLowerCase().includes(word)
      })
    })
    return result
  }, [params, posts])

  return searchedPosts
}

export default useSearchPosts
