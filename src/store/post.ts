import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { PostSortAttributeTypes } from '@/types'

export interface StoreState {
  sortAttribute: PostSortAttributeTypes
  sortOrder: 'asc' | 'desc'

  setSortAttribute: (_sortAttribute: PostSortAttributeTypes) => void
  setSortOrder: (_sortOrder: 'asc' | 'desc') => void
  toggleSortOrder: () => void
}

export const usePostStore = create<StoreState>()(
  persist(
    set => ({
      sortAttribute: 'date_started',
      sortOrder: 'desc',

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
        sortAttribute: state.sortAttribute,
        sortOrder: state.sortOrder,
      }),
    },
  ),
)
