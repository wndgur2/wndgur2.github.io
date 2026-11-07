import styles from './IconButton.module.css'

import Button, { type ButtonProps } from '../Button'

/**
 * 글자 없이 아이콘이나 이미지만 보여주는 정사각형 버튼 컴포넌트
 *
 * @param label 접근 가능한 이름 (aria-label로 렌더링)
 * @param type 버튼 타입 (기본값 button, 폼 제출에는 submit)
 * @param className 버튼에 추가할 클래스
 */

interface Props extends Omit<ButtonProps, 'aria-label'> {
  label: string
}

export default function IconButton({ label, className = '', ...props }: Props) {
  return (
    <Button
      aria-label={label}
      className={`${styles.iconButton} ${className}`}
      {...props}
    />
  )
}
