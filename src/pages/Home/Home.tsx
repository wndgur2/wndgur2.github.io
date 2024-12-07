import { FunctionComponent, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './Home.css'
import HomeCategory from './HomeCategory'
import Profile from '@/components/Profile/Profile'
import { _Post, _Project } from '@/types/_Post'
import ListedPost from '@/components/ListedPost'
import Loading from '@/components/Loading'
import ListedProject from '@/components/ListedProject'
import usePostsByCategory from '@/hooks/usePostsByCategory'
import CATEGORIES from '@/consts/CATEGORIES'
import { useRecoilValue } from 'recoil'
import { postsAtom } from '@/recoil'

const Home: FunctionComponent = () => {
  const posts = useRecoilValue(postsAtom)
  const postsByCategory = usePostsByCategory(posts)

  const router = useNavigate()
  const searchParams = useSearchParams()[0]
  const lost_url = searchParams.get('lost_url')

  useEffect(() => {
    if (!lost_url) return
    let paths = lost_url.split('/')
    paths = paths.map((path) => encodeURIComponent(path))
    router(`/${paths.join('/')}`)
  }, [lost_url, router])

  return (
    <div id='home'>
      <Profile />
      <main>
        { postsByCategory[CATEGORIES.PROJECT] && (
          <HomeCategory
            category={ CATEGORIES.PROJECT }
            more={ postsByCategory[CATEGORIES.PROJECT].length > 7 }
          >
            { postsByCategory[CATEGORIES.PROJECT].map((project: _Project, i: number) => (
              <ListedProject
                key={ i }
                post={ project }
              />
            )) }
          </HomeCategory>
        ) }
        { Object.keys(postsByCategory).length ? (
          Object.keys(postsByCategory)
            .filter((key) => key !== CATEGORIES.PROJECT)
            .map((category: any) => (
              <HomeCategory
                key={ category }
                category={ category }
                more={ postsByCategory[category].length > 7 }
              >
                { postsByCategory[category].map((post: _Post, i: number) => {
                  return (
                    <ListedPost
                      key={ i }
                      post={ post }
                    />
                  )
                }) }
              </HomeCategory>
            ))
        ) : (
          <Loading phrase='loading posts' />
        ) }
      </main>
    </div >
  )
}

export default Home
