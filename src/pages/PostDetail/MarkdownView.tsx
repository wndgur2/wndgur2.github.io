import './MarkdownView.css'

import { useEffect, type FunctionComponent } from 'react'
import hljs from 'highlight.js'
import Markdown, { type MarkdownToJSX } from 'markdown-to-jsx'

import ImageSkeleton from '@/components/Post/ImageSkeleton'
import useTheme from '@/hooks/useTheme'
import type { IPost } from '@/types'

interface MarkdownViewProps {
  post: IPost
  overrides?: MarkdownToJSX.Overrides
}

const MarkdownView: FunctionComponent<MarkdownViewProps> = ({
  post,
  overrides,
}: MarkdownViewProps) => {
  const { isDark } = useTheme()

  const mdOption = {
    overrides: {
      ...overrides,
      img: {
        component: (props: any) => <ImageSkeleton props={props} />,
      },
    },
  } as MarkdownToJSX.Options

  useEffect(() => {
    // Remove any existing highlight.js theme link
    const prevLink = document.getElementById(
      'hljs-theme',
    ) as HTMLLinkElement | null
    if (prevLink) {
      prevLink.parentNode?.removeChild(prevLink)
    }

    // Create new link element for the current theme
    const link = document.createElement('link')
    link.id = 'hljs-theme'
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = isDark
      ? 'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/atom-one-dark.css'
      : 'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/stackoverflow-light.css'
    document.head.appendChild(link)

    // Optional: cleanup on unmount
    return () => {
      const l = document.getElementById('hljs-theme')
      if (l) l.parentNode?.removeChild(l)
    }
  }, [isDark])

  useEffect(() => {
    if (!post) return
    const nodes = document.querySelectorAll('pre code')
    nodes.forEach(node => {
      if (node.hasAttribute('data-highlighted')) return
      hljs.highlightElement(node as HTMLElement)
    })
  }, [post])

  return (
    <Markdown options={mdOption} className='markdown'>
      {post.content}
    </Markdown>
  )
}

export default MarkdownView
