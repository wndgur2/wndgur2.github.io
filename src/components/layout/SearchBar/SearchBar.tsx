import { useEffect, useRef, useState } from 'react'
import { FiSearch } from 'react-icons/fi'

import styles from './SearchBar.module.css'

import { useNavigate } from 'react-router-dom'

import IconButton from '@/components/common/IconButton'
import useSearchKey from '@/features/search/useSearchKey'
import { ROUTES } from '@/router'

/**
 * 검색바 컴포넌트
 * - 검색어 입력 및 검색 결과 페이지 이동
 *
 * @param className 루트 요소에 추가할 클래스
 */

interface Props {
  className?: string
}

export default function SearchBar({ className = '' }: Props) {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [searchText, setSearchText] = useState<string>('')

  const searchKey = useSearchKey()

  useEffect(() => {
    setSearchText(searchKey)
  }, [searchKey])

  // 검색어 유무에 따라 검색 페이지 또는 홈으로 이동
  function search(e: React.FormEvent) {
    e.preventDefault()
    navigate(
      searchText ? ROUTES.SEARCH(encodeURIComponent(searchText)) : ROUTES.HOME,
    )
  }

  // 검색 영역 클릭 시 입력창 노출 및 포커스 이동
  function focusInput() {
    if (!inputRef.current) return
    inputRef.current.style.display = 'block'
    inputRef.current.focus()
  }

  return (
    <search
      onClick={focusInput}
      className={`${styles.searchBar} clickable ${className}`}
    >
      <form className={`${styles.searchForm} dimmed content`} onSubmit={search}>
        <input
          ref={inputRef}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          autoComplete='false'
        />
        <IconButton type='submit' label='검색' className={styles.pc}>
          <FiSearch className='minor' size={24} />
        </IconButton>
      </form>
      <FiSearch className={`minor ${styles.mobile}`} size={24} />
    </search>
  )
}
