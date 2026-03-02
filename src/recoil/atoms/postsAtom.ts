import { atom } from 'recoil'

import { type PostTypes } from '@/types'

export const postsAtom = atom<PostTypes[]>({
  key: 'postsAtom', // Unique ID for the atom
  default: [], // Initial state (empty array)
})
