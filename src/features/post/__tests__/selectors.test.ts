import { describe, expect, it } from 'vitest'

import CATEGORIES from '@/consts/CATEGORIES'
import type { IPost } from '@/types'
import { getTagCounts, searchPosts, sortPosts } from '../selectors'

const posts: IPost[] = [
  {
    id: '1',
    title: 'React Hooks',
    content: 'Using custom hooks for reusable logic.',
    category: CATEGORIES.STUDY,
    tags: ['react', 'hooks'],
    date_started: '2024-01-01',
    github: '',
  },
  {
    id: '2',
    title: 'Portfolio App',
    content: 'Project for my personal blog.',
    category: CATEGORIES.PROJECT,
    tags: ['react', 'vite'],
    date_started: '2024-03-01',
    github: '',
  },
]

describe('post selectors', () => {
  it('filters posts by mixed token search', () => {
    const result = searchPosts(posts, '#react @project')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('2')
  })

  it('sorts posts by date in descending order', () => {
    const result = sortPosts(posts, 'date_started', 'desc')
    expect(result.map(post => post.id)).toEqual(['2', '1'])
  })

  it('creates tag counts in descending count order', () => {
    const result = getTagCounts(posts)
    expect(result[0]).toEqual({ tag: 'react', count: 2 })
  })
})
