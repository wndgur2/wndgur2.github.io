import './SearchResultPage.css'

import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa'

import Spinner from '@/components/common/Spinner'
import TagCountList from '@/components/common/TagCountList'
import PostListItem from '@/components/post/PostListItem'
import ProjectListItem from '@/components/post/ProjectListItem'
import CATEGORIES from '@/consts/CATEGORIES'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import useResetScroll from '@/hooks/useResetScroll'
import useSearchedPosts from '@/hooks/useSearchedPosts'
import useSortedPosts from '@/hooks/useSortedPosts'
import { type IPost } from '@/types'
import { getTagsWithCounts } from '@/utils/tag'

/**
 * 검색 결과 페이지 컴포넌트
 * - 검색어에 해당하는 게시글 조회
 * - 검색 결과 정렬 (최근글순, 오랜글순)
 * - 무한 스크롤 (페이지네이션)
 */

const PAGE_SIZE = 10

export default function SearchResultPage() {
  // 검색어에 해당하는 게시글들을 가져오기
  const { searchedPosts, searchKey } = useSearchedPosts()

  // 검색 결과 정렬
  const { sortedPosts, sortOrder, sortAttribute, toggleSortOrder } =
    useSortedPosts(searchedPosts)

  // 무한 스크롤
  const {
    visibleItems: posts,
    observerRef,
    hasMore,
    isLoading,
  } = useInfiniteScroll({
    items: sortedPosts,
    pageSize: PAGE_SIZE,
    deps: [searchKey, sortAttribute, sortOrder],
  })

  useResetScroll(searchKey)
  const relatedTags = getTagsWithCounts(searchedPosts)

  return (
    <main className='search-result'>
      <header>
        <div className='search-info'>
          <h3 className='content'>{searchKey}</h3>
          <p className='dimmed content search-result-text'> &nbsp; 검색 결과</p>
        </div>
        <div>{searchKey && <TagCountList tags={relatedTags} />}</div>
        <button
          className='clickable btn-search-result-sort'
          onClick={toggleSortOrder}
        >
          <p className='dimmed content'>
            {sortOrder === 'desc' ? '최근글순' : '오랜글순'}
          </p>
          {sortOrder === 'desc' ? (
            <FaSortAmountDown className='icon' />
          ) : (
            <FaSortAmountUp className='icon' />
          )}
        </button>
      </header>
      <ul>
        {posts.length ? (
          <>
            {posts.map((post: IPost, i) =>
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
      {isLoading && <Spinner />}
    </main>
  )
}
