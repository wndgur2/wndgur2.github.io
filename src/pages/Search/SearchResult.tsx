import './SearchResult.css'
import { FunctionComponent, useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useParams } from 'react-router-dom'
import { FaSortAmountUp, FaSortAmountDown } from 'react-icons/fa'
import PostListItem from '@/components/Post/PostListItem'
import ProjectListItem from '@/components/Post/ProjectListItem'
import CATEGORIES from '@/consts/CATEGORIES'
import { searchedPostsSelector } from '@/recoil/selectors/postsSelector'
import _Post from '@/types/_Post'
import _Project from '@/types/_Project'
import useResetScroll from '@/hooks/useResetScroll'
import useRelatedTags from '@/hooks/useRelatedTags'
import TagCountList from '@/components/common/TagCountList'

// Custom hook to handle sorting logic
function useSortedPosts(searchedPosts: _Post[], recentFirst: boolean) {
  return useMemo(
    () =>
      [...searchedPosts].sort((a, b) =>
        recentFirst
          ? a.date_started < b.date_started
            ? 1
            : -1
          : a.date_started > b.date_started
          ? 1
          : -1
      ),
    [searchedPosts, recentFirst]
  )
}

const Search: FunctionComponent = () => {
  const params = useParams()
  const searchedPosts = useRecoilValue(searchedPostsSelector({ search_text: params.search_text }))
  const relatedTags = useRelatedTags(searchedPosts)
  const [recentFirst, setRecentFirst] = useState(true)
  const sortedPosts = useSortedPosts(searchedPosts, recentFirst)

  useResetScroll(params.search_text)

  const toggleSort = () => {
    setRecentFirst(!recentFirst)
  }

  return (
    <main className="search-result">
      <header>
        <div className="search-info">
          <div>
            <p className="content">Search Result for &nbsp;</p>
            <h3 className="content">{params.search_text}</h3>
          </div>
          <button
            className="clickable btn-search-result-sort"
            onClick={toggleSort}
          >
            {recentFirst ? <FaSortAmountDown /> : <FaSortAmountUp />}
          </button>
        </div>
        <div>{params.search_text && <TagCountList tags={relatedTags} />}</div>
      </header>
      <ul>
        {sortedPosts.length ? (
          sortedPosts.map((post: _Post, i) =>
            post.category === CATEGORIES.PROJECT ? (
              <ProjectListItem
                key={i}
                post={post as _Project}
              />
            ) : (
              <PostListItem
                key={i}
                post={post}
              />
            )
          )
        ) : (
          <span>No post.</span>
        )}
      </ul>
    </main>
  )
}

export default Search
