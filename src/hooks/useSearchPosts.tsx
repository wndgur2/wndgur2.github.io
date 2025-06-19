import { useMemo } from 'react'
import _Post from '@/types/_Post'
import { Params } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { postsAtom } from '@/recoil'

function useSearchPosts(params: Readonly<Params<string>>) {
  const posts = useRecoilValue(postsAtom)

  const searchedPosts: _Post[] = useMemo(() => {
    if (!params.search_text) return []
    const search_text = params.search_text.toLowerCase() as string
    const search_words = search_text.split(' ') as string[]

    let result = posts
    search_words.forEach((word) => {
      result = result.filter((post: _Post) => {
        if (word.startsWith('#'))
          // tag search
          return post.tags.map((tag) => tag.toLowerCase()).includes(word.slice(1))
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
