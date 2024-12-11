import { atom } from 'recoil'
import _Post from '@/types/_Post'

export const postsAtom = atom<_Post[]>({
  key: 'postsAtom', // Unique ID for the atom
  default: [], // Initial state (empty array)
})
