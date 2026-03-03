import { useEffect, useRef, useState } from 'react'
import { FiSearch } from 'react-icons/fi'

import './SearchBar.css'

import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { ROUTES } from '@/router'
import { searchKeyAtom } from '@/store/atoms/searchAtom'

/**
 * 검색바 컴포넌트
 * - 검색어 입력 및 검색 결과 페이지 이동
 */
export default function SearchBar() {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [searchText, setSearchText] = useState<string>('')

  const searchKey = useRecoilValue(searchKeyAtom)

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
    <search onClick={focusInput} className='search-bar clickable'>
      <form className='search-form dimmed content' onSubmit={search}>
        <input
          ref={inputRef}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          autoComplete='false'
        />
        <button type='submit' className='btn-submit pc'>
          <FiSearch className='search-icon minor' size={24} />
        </button>
      </form>
      <FiSearch className='search-icon minor mobile' size={24} />
    </search>
  )
}
