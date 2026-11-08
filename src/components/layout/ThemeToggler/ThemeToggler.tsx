import { useId, type ChangeEvent } from 'react'
import { IoMdMoon } from 'react-icons/io'
import { PiSunDimFill } from 'react-icons/pi'

import styles from './ThemeToggler.module.css'

/**
 * 테마 토글러 컴포넌트
 * - 라이트/다크 모드 전환 스위치. 체크되면 다크 모드다.
 * - 체크박스는 보이지 않게 숨기고 label이 모양을 그린다. Space로 전환할 수 있다.
 *
 * @param handleChange 테마 변경 핸들러 함수
 * @param isChecked 현재 테마 상태 (체크 여부)
 */

interface Props {
  handleChange: (_e: ChangeEvent<HTMLInputElement>) => void
  isChecked: boolean
}

export default function ThemeToggler({ handleChange, isChecked }: Props) {
  const id = useId()

  return (
    <div className={`${styles.theme} clickable`}>
      <input
        type='checkbox'
        role='switch'
        className={styles.toggle}
        id={id}
        onChange={handleChange}
        checked={isChecked}
      />
      <label htmlFor={id}>
        <span className={styles.labelText}>다크 모드</span>
      </label>
      <div className={styles.icons} aria-hidden='true'>
        <PiSunDimFill className={`${styles.sun} ${styles.themeIcon}`} />
        <IoMdMoon className={`${styles.moon} ${styles.themeIcon}`} />
      </div>
    </div>
  )
}
