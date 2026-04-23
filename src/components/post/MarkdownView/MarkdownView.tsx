import './MarkdownView.css'

import { useEffect } from 'react'
import Markdown, { type MarkdownToJSX } from 'markdown-to-jsx'

import ImageSkeleton from '@/components/post/ImageSkeleton'
import useTheme from '@/hooks/useTheme'
import type { PostTypes } from '@/types'

/**
 * 마크다운 렌더링 컴포넌트
 * - 게시글 본문을 마크다운으로 렌더링
 * - 테마에 맞는 highlight.js 스타일 동적 적용
 * - 코드 블록 하이라이팅 처리
 *
 * @param post 렌더링할 게시글 데이터
 * @param overrides markdown-to-jsx 오버라이드 옵션 (선택적)
 */

interface Props {
  post: PostTypes
  overrides?: MarkdownToJSX.Overrides
}

export default function MarkdownView({ post, overrides }: Props) {
  const { isDark } = useTheme()

  const mdOption = {
    overrides: {
      ...overrides,
      img: {
        component: (props: any) => <ImageSkeleton attrs={props} />,
      },
    },
  } as MarkdownToJSX.Options

  // 다크/라이트 모드에 맞는 코드 하이라이트 CSS 링크 교체
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

  // 렌더링된 코드 블록에 highlight.js 적용
  useEffect(() => {
    if (!post) return

    let isMounted = true

    const highlight = async () => {
      const { default: hljs } = await import('highlight.js')
      if (!isMounted) return

      const nodes = document.querySelectorAll('pre code')
      nodes.forEach(node => {
        if (node.hasAttribute('data-highlighted')) return
        hljs.highlightElement(node as HTMLElement)
      })
    }

    highlight()

    return () => {
      isMounted = false
    }
  }, [post])

  // 프로젝트 게시글의 code 필드는 본문 하단에 별도 섹션으로 병합
  let content = post.content
  if ('code' in post) {
    content = `${content}\n\n### 소스코드\n\`\`\`\n${post.code}\n\`\`\``
  }

  return (
    <Markdown options={mdOption} className='markdown'>
      {content}
    </Markdown>
  )
}
