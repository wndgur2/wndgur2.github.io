import type { ChangeEvent } from 'react'
import { IoMdMoon } from 'react-icons/io'
import { PiSunDimFill } from 'react-icons/pi'

import styles from './ThemeToggler.module.css'

/**
 * 테마 토글러 컴포넌트
 * - 라이트/다크 모드 전환 입력 UI 제공
 *
 * @param handleChange 테마 변경 핸들러 함수
 * @param isChecked 현재 테마 상태 (체크 여부)
 */

interface Props {
  handleChange: (_e: ChangeEvent<HTMLInputElement>) => void
  isChecked: boolean
}

export default function ThemeToggler({ handleChange, isChecked }: Props) {
  return (
    <div className={`${styles.theme} clickable`}>
      <input
        type='checkbox'
        className={styles.toggle}
        id='check'
        onChange={handleChange}
        checked={isChecked}
      />
      <label htmlFor='check'></label>
      <div className={styles.icons}>
        <PiSunDimFill className={`${styles.sun} ${styles.themeIcon}`} />
        <IoMdMoon className={`${styles.moon} ${styles.themeIcon}`} />
      </div>
    </div>
  )
}
