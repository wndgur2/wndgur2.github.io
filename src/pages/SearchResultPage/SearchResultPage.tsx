import './SearchResultPage.css'

import { useState } from 'react'
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import Loading from '@/components/common/Loader'
import TagCountList from '@/components/common/TagCountList'
import PostListItem from '@/components/post/PostListItem'
import ProjectListItem from '@/components/post/ProjectListItem'
import CATEGORIES from '@/consts/CATEGORIES'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import useResetScroll from '@/hooks/useResetScroll'
import useSortedPosts from '@/hooks/useSortedPosts'
import { getPostsBySearchKey } from '@/recoil/selectors/postsSelector'
import { type IPost } from '@/types'
import { getTagsWithCounts } from '@/utils/tag'

const PAGE_SIZE = 10

export default function SearchResultPage() {
  const params = useParams()
  const searchedPosts = useRecoilValue(
    getPostsBySearchKey({ searchKey: params.searchKey }),
  )
  const relatedTags = getTagsWithCounts(searchedPosts)
  const [recentFirst, setRecentFirst] = useState(true)
  const sortedPosts = useSortedPosts(searchedPosts, recentFirst)

  useResetScroll(params.searchKey)

  const toggleSort = () => {
    setRecentFirst(!recentFirst)
  }

  const { visibleItems, observerRef, hasMore, isLoading } = useInfiniteScroll({
    items: sortedPosts,
    pageSize: PAGE_SIZE,
    deps: [params.searchKey, recentFirst],
  })

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
            <FaSortAmountDown className='icon' />
          ) : (
            <FaSortAmountUp className='icon' />
          )}
        </button>
      </header>
      <ul>
        {visibleItems.length ? (
          <>
            {visibleItems.map((post: IPost, i) =>
              post.category === CATEGORIES.PROJECT ? (
                <ProjectListItem key={post.id ?? i} post={post} />
              ) : (
                <PostListItem key={post.id ?? i} post={post} />
              ),
            )}

            {hasMore && <div ref={observerRef} className='infinite-trigger' />}
          </>
        ) : (
          <span>검색 결과가 없습니다. 검색어를 확인해주세요.</span>
        )}
      </ul>
      {isLoading && <Loading />}
    </main>
  )
}
