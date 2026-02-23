import './SearchResult.css'

import { useState } from 'react'
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa'
import { useParams } from 'react-router-dom'

import TagCountList from '@/components/common/TagCountList'
import PostListItem from '@/components/Post/PostListItem'
import ProjectListItem from '@/components/Post/ProjectListItem'
import useResetScroll from '@/hooks/useResetScroll'
import { CATEGORIES, type IPost, type IProject, type ITag } from '@/types'

export default function Search() {
  const params = useParams()
  const [recentFirst, setRecentFirst] = useState(true)

  const sortedPosts: IPost[] = []
  const relatedTags: ITag[] = []

  useResetScroll(params.searchKey)

  const toggleSort = () => {
    setRecentFirst(!recentFirst)
  }

  return (
    <main className='search-result'>
      <header>
        <div className='search-info'>
          <h3 className='content'>{params.searchKey}</h3>
          <p className='dimmed content search-result-text'> &nbsp; 검색 결과</p>
        </div>
        <div>{params.searchKey && <TagCountList tags={relatedTags} />}</div>
        <button
          className='clickable btn-search-result-sort'
          onClick={toggleSort}
        >
          <p className='dimmed content'>
            {recentFirst ? '최근글순' : '오랜글순'}
          </p>
          {recentFirst ? (
            <FaSortAmountUp className='icon' />
          ) : (
            <FaSortAmountDown className='icon' />
          )}
        </button>
      </header>
      <ul>
        {sortedPosts.length ? (
          sortedPosts.map((post: IPost, i) =>
            post.category === CATEGORIES.PROJECT ? (
              <ProjectListItem key={i} project={post as IProject} />
            ) : (
              <PostListItem key={i} post={post} />
            ),
          )
        ) : (
          <span>No post.</span>
        )}
      </ul>
    </main>
  )
}
