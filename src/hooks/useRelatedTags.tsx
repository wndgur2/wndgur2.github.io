import { useMemo } from 'react'

import { type IPost } from '@/types'
import { getTagsWithCounts } from '@/utils/tagUtils'

const useRelatedTags = (posts: IPost[]): { tag: string; count: number }[] => {
  return useMemo(() => getTagsWithCounts(posts), [posts])
}

export default useRelatedTags
