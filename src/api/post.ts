import { type IAlgorithm, type IPost, type PostTypes } from '@/types'
import { sortedInsert } from '@/utils/sortedInsert'

export async function getPosts(
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>,
) {
  try {
    const res = await fetch('/meta/posts.json')
    const posts: IPost[] = await res.json()
    posts.forEach(p => {
      setPosts(prev => sortedInsert(prev, p))
    })
  } catch (e) {
    console.error('Failed to load posts.json', e)
  }
}

export async function getAlgorithms(
  setPosts: React.Dispatch<React.SetStateAction<PostTypes[]>>,
) {
  try {
    const res = await fetch('/meta/algorithms.json')
    const solves: IAlgorithm[] = await res.json()
    solves.forEach(s => {
      setPosts(prev => sortedInsert(prev, s))
    })
  } catch (e) {
    console.error('Failed to load algorithms.json', e)
  }
}

export async function getProjects(
  setPosts: React.Dispatch<React.SetStateAction<PostTypes[]>>,
) {
  try {
    const res = await fetch('/meta/projects.json')
    const projects: IPost[] = await res.json()
    projects.forEach(project => {
      setPosts(prev => sortedInsert(prev, project))
    })
  } catch (e) {
    console.error('Failed to load projects.json', e)
  }
}
