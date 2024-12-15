import { FunctionComponent, useEffect, useRef } from 'react'
import './HomeCategory.css'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import { IoIosArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom'
interface HomeCategoryProps {
  category: string
  children: JSX.Element[]
}

const HomeCategory: FunctionComponent<HomeCategoryProps> = ({
  category,
  children,
}: HomeCategoryProps) => {
  const postsRef = useRef<HTMLUListElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  const scrollPosts = (direction: 'backward' | 'forward') => {
    if (postsRef.current) {
      postsRef.current.scrollBy({
        left: direction === 'backward' ? -600 : 600,
        behavior: 'smooth',
      })
    }
  }

  const changeScrollButtons = () => {
    if (!postsRef.current) return
    if (!buttonsRef.current) return
    if (postsRef.current.scrollLeft === 0)
      buttonsRef.current.querySelector('button:first-child')?.setAttribute('disabled', 'true')
    else buttonsRef.current.querySelector('button:first-child')?.removeAttribute('disabled')

    if (
      postsRef.current.scrollLeft + postsRef.current.getBoundingClientRect().width >=
      postsRef.current.scrollWidth * 0.99
    )
      buttonsRef.current.querySelector('button:last-child')?.setAttribute('disabled', 'true')
    else buttonsRef.current.querySelector('button:last-child')?.removeAttribute('disabled')
  }

  useEffect(() => {
    changeScrollButtons()
  }, [children])

  if (!children || children.length === 0) return <></>

  return (
    <section className='home-category'>
      <header>
        <Link
          className='link'
          to={ `/search/@${category}` }
          state={ { search_text: `@${category}` } }
        >
          <h1>{ category[0].toUpperCase() + category.slice(1) }</h1>
          <IoIosArrowForward size={ 24 } />
        </Link>
        <div
          className='scroll-buttons'
          ref={ buttonsRef }
        >
          <button className='icon' onClick={ () => scrollPosts('backward') }>
            <RiArrowLeftSLine size={ 28 } />
          </button>
          <button className='icon' onClick={ () => scrollPosts('forward') }>
            <RiArrowRightSLine size={ 28 } />
          </button>
        </div>
      </header>
      <ul
        className='posts'
        ref={ postsRef }
        onScroll={ changeScrollButtons }
      >
        { children }
      </ul>
    </section>
  )
}

export default HomeCategory
