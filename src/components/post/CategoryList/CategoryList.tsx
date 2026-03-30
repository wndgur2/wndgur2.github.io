import CATEGORIES from '@/consts/CATEGORIES'
import CategoryListItem from '../CategoryListItem'

export default function CategoryList() {
  return (
    <main>
      <CategoryListItem category={CATEGORIES.PROJECT} />
      <CategoryListItem category={CATEGORIES.STUDY} />
      <CategoryListItem category={CATEGORIES.ALGORITHM} />
    </main>
  )
}
