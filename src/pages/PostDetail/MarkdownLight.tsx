import type { MarkdownToJSX } from 'markdown-to-jsx'
import Markdown from 'markdown-to-jsx'

interface MarkdownProps {
  children: string
  options: MarkdownToJSX.Options
}

export default function MarkdownLight(props: MarkdownProps) {
  import('highlight.js/styles/stackoverflow-light.css')
  console.log('markdown dark')

  return (
    <Markdown className='markdown' {...props}>
      {props.children}
    </Markdown>
  )
}
