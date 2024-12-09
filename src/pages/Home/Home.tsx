import { FunctionComponent, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './Home.css'
import HomeCategory from './HomeCategory'
import Profile from '@/components/Profile/Profile'
import { _Post, _Project } from '@/types/_Post'
import ListedPost from '@/components/Post/ListedPost'
import Loading from '@/components/Loading'
import ListedProject from '@/components/Post/ListedProject'
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

        <HomeCategory
          category={ CATEGORIES.PROJECT }
        >
          {
            postsByCategory[CATEGORIES.PROJECT] ? (
              postsByCategory[CATEGORIES.PROJECT].map((project: _Project, i: number) => (
                <ListedProject
                  key={ i }
                  post={ project }
                />
              ))
            ) :
              <Loading phrase='loading projects' />
          }
        </HomeCategory>
        {
          Object.keys(postsByCategory)
            .filter((key) => key !== CATEGORIES.PROJECT)
            .map((category: any) => (
              <HomeCategory
                key={ category }
                category={ category }
              >
                { postsByCategory[category].length ? postsByCategory[category].map
                  ((post: _Post, i: number) => {
                    return (
                      <ListedPost
                        key={ i }
                        post={ post }
                      />
                    )
                  }) :
                  <Loading phrase={ `loading ${category} posts` } />
                }
              </HomeCategory>
            ))
        }
      </main>
    </div >
  )
}

export default Home
