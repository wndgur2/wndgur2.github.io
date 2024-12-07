// utils/sortedInsert.ts
import { _Post } from '../types/_Post'

export const sortedInsert = (posts: _Post[], newPost: _Post): _Post[] => {
  // Check if the post already exists
  if (posts.find((post) => post.id === newPost.id)) {
    return posts
  }

  // Binary search for the correct index
  let left = 0
  let right = posts.length - 1
  let index = 0

  while (left <= right) {
    index = Math.floor((left + right) / 2)
    if (posts[index].date_started > newPost.date_started) {
      left = index + 1
      index = left
    } else if (posts[index].date_started < newPost.date_started) {
      right = index - 1
    } else {
      break
    }
  }

  // Insert post into the correct position
  return [...posts.slice(0, index), newPost, ...posts.slice(index)]
}
