import { atom } from 'recoil'
import { type IPost } from '@/types'

export const postsAtom = atom<IPost[]>({
  key: 'postsAtom', // Unique ID for the atom
  default: [], // Initial state (empty array)
})
