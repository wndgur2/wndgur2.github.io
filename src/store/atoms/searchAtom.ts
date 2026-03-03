import { atom } from 'recoil'

import type { PostSortAttributeTypes } from '@/types'
import { localStorageEffect } from '../effects/localstorageEffect'

export const searchKeyAtom = atom<string>({
  key: 'searchKeyAtom',
  default: '',
  effects: [localStorageEffect('searchKey')],
})

export const sortAttributeAtom = atom<PostSortAttributeTypes>({
  key: 'sortAttributeAtom',
  default: 'date_started',
  effects: [localStorageEffect('sortAttribute')],
})

export const sortOrderAtom = atom<'asc' | 'desc'>({
  key: 'sortOrderAtom',
  default: 'desc',
  effects: [localStorageEffect('sortOrder')],
})
