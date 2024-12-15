import CATEGORIES from '@/consts/CATEGORIES'
import usePostsByCategory from '@/hooks/usePostsByCategory'
import HomeCategory from '@/pages/Home/HomeCategory'
import { postsAtom } from '@/recoil'
import _Project from '@/types/_Project'
import { FunctionComponent } from 'react'
import { useRecoilValue } from 'recoil'
import Loading from '../common/Loading'
import ProjectListItem from './ProjectListItem'

interface ProjectListProps {}

const ProjectList: FunctionComponent<ProjectListProps> = () => {
  const posts = useRecoilValue(postsAtom)
  const postsByCategory = usePostsByCategory(posts)

  return (
    <HomeCategory category={CATEGORIES.PROJECT}>
      {postsByCategory[CATEGORIES.PROJECT] ? (
        postsByCategory[CATEGORIES.PROJECT].map((project: _Project, i: number) => (
          <ProjectListItem
            key={i}
            post={project}
          />
        ))
      ) : (
        <Loading phrase="loading projects" />
      )}
    </HomeCategory>
  )
}

export default ProjectList
