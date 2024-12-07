import 'highlight.js/styles/github-dark.css'
import './Post.css'
import { FunctionComponent, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Markdown, { MarkdownToJSX } from 'markdown-to-jsx'
import hljs from 'highlight.js'
import { IoLogoGithub } from 'react-icons/io'
import Tag from '@/components/Tag'
import Loading from '@/components/Loading'
import useResetScroll from '@/hooks/useResetScroll'
import CATEGORIES from '@/consts/CATEGORIES'
import ImageSkeleton from '@/components/ImageSkeleton'
import { useRecoilValue } from 'recoil'
import { postSelector } from '@/recoil'

const Post: FunctionComponent = () => {
  const title = useParams().post_title
  const post = useRecoilValue(postSelector({ post_title: title }))
  useResetScroll()

  const mdOption = {
    overrides: {
      img: {
        component: (props: any) => <ImageSkeleton props={ props } />,
      },

      p: {
        component: ({ children }) => <div className='post-content-block'>{ children }</div>,
      },
    }
  } as MarkdownToJSX.Options

  useEffect(() => {
    if (!post) return
    const nodes = document.querySelectorAll('pre code')
    nodes.forEach((node) => {
      if (node.hasAttribute('data-highlighted')) return
      hljs.highlightElement(node as HTMLElement)
    })
  }, [post])

  return (
    <>
      { post ? (
        <div className='post'>
          <header>
            <section className='post-title'>
              <h2>{ title }</h2>
              <ol className='tags'>
                { post.tags.map((tag: string, index: number) => (
                  <Tag
                    key={ index }
                    tag={ tag }
                  />
                )) }
              </ol>
            </section>
            <section className='post-meta'>
              <Link
                className='link github'
                to={ post.github }
                rel='noreferrer'
                target='_blank'
              >
                <IoLogoGithub size={ 42 } />
              </Link>
              <small>
                { post.date_started } ~ { post.date_finished }
              </small>
            </section>
          </header>
          <main className='post-content'>
            <Markdown options={ mdOption }>
              { post.content +
                (post.category === CATEGORIES.ALGORITHM
                  ? '\n\n```' + post.language + '\n\n' + post.code + '```'
                  : '') }
            </Markdown>
          </main>
        </div>
      ) : (
        <Loading phrase='Loading post' />
      ) }
    </>
  )
}

export default Post
