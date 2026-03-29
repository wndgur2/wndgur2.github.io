import { type IPost } from '@/types'
import { filterPostsBySearchKey } from '@/utils/filterPosts'

export const getPostsByCategory = (posts: IPost[], category: string): IPost[] =>
  posts.filter(post => post.category === category)

export const getPostsBySearchKey = (
  posts: IPost[],
  searchKey?: string,
): IPost[] => filterPostsBySearchKey(posts, searchKey)

export const getPostByTitle = (
  posts: IPost[],
  title?: string,
): IPost | null => {
  if (!posts.length) return null

  return posts.find(post => post.title === title) || null
}

export const getPrevPost = (posts: IPost[], title?: string): IPost | null => {
  if (!posts.length) return null

  const postIndex = posts.findIndex(post => post.title === title)
  if (postIndex === -1) return null
  return posts[postIndex + 1] || null
}

export const getNextPost = (posts: IPost[], title?: string): IPost | null => {
  if (!posts.length) return null

  const postIndex = posts.findIndex(post => post.title === title)
  if (postIndex === -1) return null
  return posts[postIndex - 1] || null
}
