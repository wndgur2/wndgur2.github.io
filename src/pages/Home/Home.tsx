import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import './Home.css'

import { useUserRepos } from '@/api/post'
import PostList from '@/components/Post/PostList'
import ProjectList from '@/components/Post/ProjectList'
import Profile from '@/components/Profile/Profile'

export default function Home() {
  const router = useNavigate()
  const searchParams = useSearchParams()[0]
  const lost_url = searchParams.get('lost_url')

  const { data, isLoading } = useUserRepos()

  useEffect(() => {
    if (isLoading) return
    if (!data) return
    console.log(data)
  }, [data, isLoading])

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
        <ProjectList />
        <PostList />
      </main>
    </div>
  )
}
