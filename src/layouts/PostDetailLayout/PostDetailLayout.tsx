import { Suspense } from 'react'
import { IoLogoGithub } from 'react-icons/io'
import { Outlet } from 'react-router-dom'

import IconLink from '@/components/common/IconLink'
import Spinner from '@/components/common/Spinner'
import TextSkeleton from '@/components/common/TextSkeleton'

export default function PostDetailLayout() {
  return (
    <Suspense
      fallback={
        <article className='post'>
          <header>
            <section className='post-title'>
              <TextSkeleton width={'30%'} />
              <h2>
                <TextSkeleton height={24} width={'55%'} />
              </h2>
              <TextSkeleton width={'80%'} height={'40px'} />
            </section>
            <section className='post-meta'>
              <IconLink icon={<IoLogoGithub size={42} />} url={''} />
              <small>
                <TextSkeleton width={'80px'} />
              </small>
            </section>
          </header>
          <main
            className='post-content'
            style={{
              height: '420px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Spinner phrase='글 불러오는 중...' />
          </main>
          <nav>
            {
              <p className={'disabled next'}>
                <small>&lt; next</small>
                <div>
                  <p>
                    <TextSkeleton />
                  </p>
                </div>
              </p>
            }
            <p className='clickable list'>
              <div>목록으로</div>
            </p>
            <p className={'disabled prev'}>
              <small>previous &gt; </small>
              <div>
                <p>
                  <TextSkeleton />
                </p>
              </div>
            </p>
          </nav>
        </article>
      }
    >
      <Outlet />
    </Suspense>
  )
}
