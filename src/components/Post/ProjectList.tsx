import HomeCategory from '@/pages/Home/HomeCategory'
import { CATEGORIES, type IPost } from '@/types'
import Loading from '../common/Loading'
import ProjectListItem from './ProjectListItem'

export default function ProjectList() {
  const projects: IPost[] = []

  return (
    <HomeCategory category={CATEGORIES.PROJECT}>
      {projects.length > 0 ? (
        projects.map((project: IPost, i: number) => (
          <ProjectListItem key={i} post={project} />
        ))
      ) : (
        <Loading phrase='loading projects' />
      )}
    </HomeCategory>
  )
}
