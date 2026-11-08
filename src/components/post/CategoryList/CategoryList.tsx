import { lazy, Suspense } from 'react'

import CategoryListItem from '@/components/post/CategoryListItem'
import CATEGORIES from '@/consts/CATEGORIES'

// d3-force가 홈 첫 번들에 들어가지 않도록 지연 로드한다.
const KnowledgeGraphPreview = lazy(
  () => import('@/components/post/KnowledgeGraphPreview'),
)

export default function CategoryList() {
  return (
    <main>
      <CategoryListItem category={CATEGORIES.PROJECT} />
      <CategoryListItem category={CATEGORIES.STUDY} />
      <CategoryListItem category={CATEGORIES.ALGORITHM} />
      <Suspense fallback={null}>
        <KnowledgeGraphPreview />
      </Suspense>
    </main>
  )
}
