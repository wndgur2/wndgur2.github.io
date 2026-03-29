import { expect, test } from 'vitest'

import CATEGORIES from '@/consts/CATEGORIES'
import type { PostTypes } from '@/types'
import { filterPostsBySearchKey } from './filterPosts'

test('filterPostsBySearchKey(posts, searchKey)', () => {
  const posts: PostTypes[] = [
    {
      id: '1',
      category: CATEGORIES.ALGORITHM,
      title: 'Learning TS',
      content: 'TypeScript is a typed superset of JavaScript.',
      tags: ['typescript', 'javascript'],
      date_started: '2024-01-01',
      github: '',
    },
    {
      id: '2',
      category: CATEGORIES.STUDY,
      title: 'Best Pasta Recipes',
      content: 'Pasta is a staple food of Italian cuisine.',
      tags: ['cooking', 'pasta'],
      date_started: '2024-02-01',
      github: '',
    },
  ]

  expect(filterPostsBySearchKey(posts, 'TypeScript')).toEqual([posts[0]])
  expect(filterPostsBySearchKey(posts, '#cooking')).toEqual([posts[1]])
  expect(filterPostsBySearchKey(posts, `@${CATEGORIES.ALGORITHM}`)).toEqual([
    posts[0],
  ])
  expect(filterPostsBySearchKey(posts, 'JavaScript')).toEqual([posts[0]])
  expect(filterPostsBySearchKey(posts, 'Pasta')).toEqual([posts[1]])
  expect(filterPostsBySearchKey(posts, 'Python')).toEqual([])
})
