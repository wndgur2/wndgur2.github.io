import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { IPost, PostSortAttributeTypes, PostTypes } from '@/types'

export interface StoreState {
  posts: PostTypes[]
  searchKey: string
  sortAttribute: PostSortAttributeTypes
  sortOrder: 'asc' | 'desc'
  setPosts: (_updater: React.SetStateAction<IPost[]>) => void
  setSearchKey: (_searchKey: string) => void
  setSortAttribute: (_sortAttribute: PostSortAttributeTypes) => void
  setSortOrder: (_sortOrder: 'asc' | 'desc') => void
  toggleSortOrder: () => void
}

export const useStore = create<StoreState>()(
  persist(
    set => ({
      posts: [],
      searchKey: '',
      sortAttribute: 'date_started',
      sortOrder: 'desc',
      setPosts: updater =>
        set(state => ({
          posts: typeof updater === 'function' ? updater(state.posts) : updater,
        })),
      setSearchKey: searchKey => set({ searchKey }),
      setSortAttribute: sortAttribute => set({ sortAttribute }),
      setSortOrder: sortOrder => set({ sortOrder }),
      toggleSortOrder: () =>
        set(state => ({
          sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc',
        })),
    }),
    {
      name: 'store',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        searchKey: state.searchKey,
        sortAttribute: state.sortAttribute,
        sortOrder: state.sortOrder,
      }),
    },
  ),
)

export * from './selectors/postsSelector'
