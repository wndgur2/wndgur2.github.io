import { useEffect, useRef, useState, type FunctionComponent } from 'react'
import { FiSearch } from 'react-icons/fi'

import './SearchBar.css'

import { useLocation, useNavigate } from 'react-router-dom'

interface SearchBarProps {}

const SearchBar: FunctionComponent<SearchBarProps> = () => {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [searchText, setSearchText] = useState<string>('')
  const { state } = useLocation()

  useEffect(() => {
    if (state) setSearchText(state.searchKey)
  }, [state])

  function search(e: React.FormEvent) {
    e.preventDefault()
    if (searchText) {
      navigate(`/search/${encodeURIComponent(searchText)}`, {
        state: { searchKey: searchText },
      })
    } else {
      navigate(`/`, {
        state: { searchKey: '' },
      })
    }
  }

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
        />
        <button type='submit' className='btn-submit pc'>
          <FiSearch className='search-icon minor' size={24} />
        </button>
      </form>
      <FiSearch className='search-icon minor mobile' size={24} />
    </search>
  )
}

export default SearchBar
