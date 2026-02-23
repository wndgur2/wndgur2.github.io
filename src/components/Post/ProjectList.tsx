import { useContext } from 'react'

import { GithubContext } from '@/contexts/GithubContext'
import HomeCategory from '@/pages/Home/HomeCategory'
import { CATEGORIES } from '@/types'
import Loading from '../common/Loading'
import ProjectListItem from './ProjectListItem'

export default function ProjectList() {
  const { projects } = useContext(GithubContext)

  return (
    <HomeCategory category={CATEGORIES.PROJECT}>
      {projects.length > 0 ? (
        projects.map((project, i: number) => (
          <ProjectListItem key={i} project={project} />
        ))
      ) : (
        <Loading phrase='loading projects' />
      )}
    </HomeCategory>
  )
}
