import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { PostSortAttributeTypes } from '@/types'

export interface StoreState {
  searchKey: string
  sortAttribute: PostSortAttributeTypes
  sortOrder: 'asc' | 'desc'

  setSearchKey: (_searchKey: string) => void
  setSortAttribute: (_sortAttribute: PostSortAttributeTypes) => void
  setSortOrder: (_sortOrder: 'asc' | 'desc') => void
  toggleSortOrder: () => void
}

export const usePostStore = create<StoreState>()(
  persist(
    set => ({
      searchKey: '',
      sortAttribute: 'date_started',
      sortOrder: 'desc',

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
