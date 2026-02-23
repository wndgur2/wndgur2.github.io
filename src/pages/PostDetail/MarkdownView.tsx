import './MarkdownView.css'

import { useContext, useEffect } from 'react'
import hljs from 'highlight.js'
import Markdown, { type MarkdownToJSX } from 'markdown-to-jsx'

import ImageSkeleton from '@/components/Post/ImageSkeleton'
import { ThemeContext } from '@/contexts/ThemeProvider'
import type { IPost } from '@/types'

interface MarkdownViewProps {
  post: IPost
  overrides?: MarkdownToJSX.Overrides
}

export default function MarkdownView({ post, overrides }: MarkdownViewProps) {
  const { isDark } = useContext(ThemeContext)

  const mdOption = {
    overrides: {
      ...overrides,
      img: {
        component: ({ children, props }) => <ImageSkeleton {...props} />,
      },
      br: {
        component: ({ children }) => <br className='markdown-line-break' />,
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
