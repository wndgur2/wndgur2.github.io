import type { ComponentProps } from 'react'

import styles from './Button.module.css'

/**
 * 버튼 컴포넌트
 * - 호버, 비활성, 키보드 포커스 스타일을 제공
 *
 * @param type 버튼 타입 (기본값 button, 폼 제출에는 submit)
 * @param className 버튼에 추가할 클래스
 */

export type ButtonProps = Pick<
  ComponentProps<'button'>,
  | 'type'
  | 'className'
  | 'onClick'
  | 'disabled'
  | 'ref'
  | 'aria-label'
  | 'aria-pressed'
  | 'children'
>

export default function Button({
  type = 'button',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.button} ${className}`}
      {...props}
    />
  )
}
