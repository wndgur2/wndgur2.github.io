import './MarkdownView.css'
import ImageSkeleton from '@/components/Post/ImageSkeleton'
import CATEGORIES from '@/consts/CATEGORIES'
import _Post from '@/types/_Post'
import Markdown, { MarkdownToJSX } from 'markdown-to-jsx'
import { FunctionComponent, useEffect } from 'react'
import hljs from 'highlight.js'

interface MarkdownViewProps {
  post: _Post
}

const MarkdownView: FunctionComponent<MarkdownViewProps> = ({ post }: MarkdownViewProps) => {
  const mdOption = {
    overrides: {
      img: {
        component: (props: any) => <ImageSkeleton props={props} />,
      },
      p: {
        component: ({ children }) => <div className="post-content-block">{children}</div>,
      },
    },
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
    <Markdown
      options={mdOption}
      className="markdown"
    >
      {post.content +
        (post.category.toLowerCase() === CATEGORIES.ALGORITHM
          ? '\n\n```' + post.language + '\n\n' + post.code + '```'
          : '')}
    </Markdown>
  )
}

export default MarkdownView
