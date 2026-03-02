import type { MarkdownToJSX } from 'markdown-to-jsx'
import Markdown from 'markdown-to-jsx'

interface Props {
  children: string
  options: MarkdownToJSX.Options
}

export default function MarkdownDark(props: Props) {
  import('highlight.js/styles/atom-one-dark.css')

  console.log('markdown dark')

  return (
    <Markdown className='markdown' {...props}>
      {props.children}
    </Markdown>
  )
}
