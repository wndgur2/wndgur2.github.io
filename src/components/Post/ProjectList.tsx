import { useRecoilValue } from 'recoil'

import CATEGORIES from '@/consts/CATEGORIES'
import HomeCategory from '@/pages/Home/HomeCategory'
import { getPostsByCategory } from '@/recoil/selectors/postsSelector'
import { type IPost } from '@/types'
import Loading from '../common/Loader'
import ProjectListItem from './ProjectListItem'

export default function ProjectList() {
  const postsByCategory = useRecoilValue(
    getPostsByCategory({ category: CATEGORIES.PROJECT }),
  )

  return (
    <HomeCategory label='Projects' category={CATEGORIES.PROJECT}>
      {postsByCategory.length > 0 ? (
        postsByCategory.map((project: IPost, i: number) => (
          <ProjectListItem key={i} post={project} />
        ))
      ) : (
        <Loading phrase='loading projects' />
      )}
    </HomeCategory>
  )
}
