import { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import './Home.css'

import PostList from '@/components/Post/PostList'
import Profile from '@/components/Profile/Profile'
import { GithubContext } from '@/contexts/GithubContext'
import { CATEGORIES } from '@/types'

export default function Home() {
  const router = useNavigate()
  const searchParams = useSearchParams()[0]
  const lost_url = searchParams.get('lost_url')
  const { studies, algorithmSolutions, projects } = useContext(GithubContext)

  useEffect(() => {
    if (!lost_url) return
    let paths = lost_url.split('/')
    paths = paths.map(path => encodeURIComponent(path))
    router(`/${paths.join('/')}`)
  }, [lost_url, router])

  return (
    <div id='home'>
      <Profile />
      <main>
        <PostList category={CATEGORIES.PROJECT} posts={projects} />
        <PostList category={CATEGORIES.STUDY} posts={studies} />
        <PostList category={CATEGORIES.ALGORITHM} posts={algorithmSolutions} />
      </main>
    </div>
  )
}
