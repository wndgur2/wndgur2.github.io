import { sortedInsert } from '@/utils/sortedInsert'
import { _Post } from '../types/_Post'
import fetchRawData from './fetchRawData'

const fetchProjects = async (
  setPosts: React.Dispatch<React.SetStateAction<_Post[]>>
): Promise<void> => {
  try {
    console.log('Fetching projects...')
    // Fetch metadata.json
    const response = await fetch('/metadata.json')
    const data = await response.json()

    // Convert the metadata into posts
    const posts: _Post[] = Object.values(data)

    // Process each post
    posts.map(async (post) => {
      // Load content from the project's README
      try {
        const text = await fetchRawData(
          `https://raw.githubusercontent.com/wndgur2/${post.title}/main/README.md`
        )

        post.content =
          text === '' || text.startsWith('<!DOCTYPE html>') ? 'This post is not available.' : text

        // Assign ID and construct thumbnail
        post.id = post.title

        const img = new Image()
        img.src = '/images/' + post.title.toLowerCase() + '.jpeg'

        post.thumbnail = `<img src="${img.src}" alt="${post.title}" />`

        setPosts((prevPosts) => sortedInsert(prevPosts, post))
      } catch (error) {
        console.error('Error fetching project content:', error)
        return null
      }
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
  }
}

export default fetchProjects
