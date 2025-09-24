import { type FunctionComponent } from 'react'
import { useRecoilValue } from 'recoil'

import CATEGORIES from '@/consts/CATEGORIES'
import HomeCategory from '@/pages/Home/HomeCategory'
import { getPostsByCategory } from '@/recoil/selectors/postsSelector'
import { type IPost } from '@/types'
import Loading from '../common/Loading'
import ProjectListItem from './ProjectListItem'

interface ProjectListProps {}

const ProjectList: FunctionComponent<ProjectListProps> = () => {
  const postsByCategory = useRecoilValue(
    getPostsByCategory({ category: CATEGORIES.PROJECT }),
  )

  return (
    <HomeCategory category={CATEGORIES.PROJECT}>
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

export default ProjectList
