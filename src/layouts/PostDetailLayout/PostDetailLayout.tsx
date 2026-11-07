import { Suspense } from 'react'
import { IoLogoGithub } from 'react-icons/io'
import { Outlet } from 'react-router-dom'

import IconLink from '@/components/common/IconLink'
import Spinner from '@/components/common/Spinner'
import TextSkeleton from '@/components/common/TextSkeleton'
import styles from '@/pages/PostDetailPage/PostDetailPage.module.css'

export default function PostDetailLayout() {
  return (
    <Suspense
      fallback={
        <article className={styles.post}>
          <header>
            <section className={styles.postTitle}>
              <TextSkeleton width={'30%'} />
              <h2>
                <TextSkeleton height={24} width={'55%'} />
              </h2>
              <TextSkeleton width={'80%'} height={'40px'} />
            </section>
            <section className={styles.postMeta}>
              <IconLink icon={<IoLogoGithub size={42} />} url={''} />
              <small>
                <TextSkeleton width={'80px'} />
              </small>
            </section>
          </header>
          <main
            className={styles.postContent}
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
              <p className={`${styles.disabled} ${styles.next}`}>
                <small>&lt; next</small>
                <div>
                  <p>
                    <TextSkeleton />
                  </p>
                </div>
              </p>
            }
            <p className={`clickable ${styles.list}`}>
              <div>목록으로</div>
            </p>
            <p className={`${styles.disabled} ${styles.prev}`}>
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
