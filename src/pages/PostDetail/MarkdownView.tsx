import './MarkdownView.css'

import { useEffect, type FunctionComponent } from 'react'
import hljs from 'highlight.js'
import Markdown, { type MarkdownToJSX } from 'markdown-to-jsx'

import ImageSkeleton from '@/components/Post/ImageSkeleton'
import type { IPost } from '@/types'

import 'highlight.js/styles/atom-one-dark.css'

interface MarkdownViewProps {
  post: IPost
  overrides?: MarkdownToJSX.Overrides
}

const MarkdownView: FunctionComponent<MarkdownViewProps> = ({
  post,
  overrides,
}: MarkdownViewProps) => {
  const mdOption = {
    overrides: {
      ...overrides,
      img: {
        component: (props: any) => <ImageSkeleton props={props} />,
      },
    },
  } as MarkdownToJSX.Options

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
