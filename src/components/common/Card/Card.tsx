import type { ReactNode } from 'react'

import styles from './Card.module.css'

import { Link, type LinkProps } from 'react-router-dom'

/**
 * 목록 항목 카드 컴포넌트
 * - 루트가 li이므로 ul이나 ol 안에서 쓴다.
 * - 안에 CardLink를 하나 넣으면 카드 전체가 그 링크로 동작한다.
 * - 태그처럼 카드 안에 둔 다른 링크는 CardLink 밖에 두면 CardLink 위로 올라온다.
 *
 * @param className 카드에 추가할 클래스
 */

interface CardProps {
  className?: string
  children: ReactNode
}

export default function Card({ className = '', children }: CardProps) {
  return (
    <li className={`${styles.card} link clickable ${className}`}>{children}</li>
  )
}

/**
 * 카드 전체를 덮는 링크 컴포넌트
 * - 키보드 포커스와 스크린리더에는 감싼 글자(제목)만 링크로 노출된다.
 *
 * @param to 이동할 경로
 * @param state 이동 시 넘길 location state
 */

type CardLinkProps = Pick<LinkProps, 'to' | 'state' | 'children'>

export function CardLink({ to, state, children }: CardLinkProps) {
  return (
    <Link className={styles.cardLink} to={to} state={state}>
      {children}
    </Link>
  )
}
