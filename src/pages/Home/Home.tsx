import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import './Home.css'

import { useRecoilValue } from 'recoil'

import Loading from '@/components/common/Loader'
import PostListItem from '@/components/Post/PostListItem'
import ProjectListItem from '@/components/Post/ProjectListItem'
import Profile from '@/components/Profile/Profile'
import CATEGORIES from '@/consts/CATEGORIES'
import usePostsByCategory from '@/hooks/usePostsByCategory'
import { postsAtom } from '@/recoil'
import type { IPost } from '@/types'
import HomeCategory from './HomeCategory'

export default function Home() {
  const router = useNavigate()
  const searchParams = useSearchParams()[0]
  const lost_url = searchParams.get('lost_url')

  useEffect(() => {
    if (!lost_url) return
    let paths = lost_url.split('/')
    paths = paths.map(path => encodeURIComponent(path))
    router(`/${paths.join('/')}`)
  }, [lost_url, router])

  const posts = useRecoilValue(postsAtom)
  const { projects, algorithms, studies } = usePostsByCategory(posts, 10)

  return (
    <div id='home'>
      <Profile />
      <main>
        <HomeCategory label='Projects' category={CATEGORIES.PROJECT}>
          {projects.length > 0 ? (
            projects.map((project: IPost) => (
              <ProjectListItem key={project.id} post={project} />
            ))
          ) : (
            <Loading phrase='loading projects' />
          )}
        </HomeCategory>

        <HomeCategory label='Studies' category={CATEGORIES.STUDY}>
          {studies.length ? (
            studies.map((post: IPost) => (
              <PostListItem key={post.id} post={post} />
            ))
          ) : (
            <Loading phrase={`loading studies`} />
          )}
        </HomeCategory>

        <HomeCategory label='Algorithms' category={CATEGORIES.ALGORITHM}>
          {algorithms.length ? (
            algorithms.map((post: IPost) => (
              <PostListItem key={post.id} post={post} />
            ))
          ) : (
            <Loading phrase={`loading algorithms`} />
          )}
        </HomeCategory>
      </main>
    </div>
  )
}
