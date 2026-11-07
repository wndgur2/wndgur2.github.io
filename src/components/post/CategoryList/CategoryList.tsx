import CATEGORIES from '@/consts/CATEGORIES'
import CategoryListItem from '@/components/post/CategoryListItem'

interface Props {
  className?: string
}

export default function CategoryList({ className }: Props) {
  return (
    <main className={className}>
      <CategoryListItem category={CATEGORIES.PROJECT} />
      <CategoryListItem category={CATEGORIES.STUDY} />
      <CategoryListItem category={CATEGORIES.ALGORITHM} />
    </main>
  )
}
