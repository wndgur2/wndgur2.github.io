import './MarkdownView.css'
import ImageSkeleton from '@/components/Post/ImageSkeleton'
import _Post from '@/types/_Post'
import Markdown, { MarkdownToJSX } from 'markdown-to-jsx'
import { FunctionComponent, useEffect } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

interface MarkdownViewProps {
  post: _Post
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
    nodes.forEach((node) => {
      if (node.hasAttribute('data-highlighted')) return
      hljs.highlightElement(node as HTMLElement)
    })
  }, [post])

  return (
    <Markdown options={mdOption} className="markdown">
      {post.content}
    </Markdown>
  )
}

export default MarkdownView
