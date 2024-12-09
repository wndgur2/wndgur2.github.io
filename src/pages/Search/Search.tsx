import './Search.css';
import { FunctionComponent, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import ListedPost from "@/components/Post/ListedPost";
import ListedProject from "@/components/Post/ListedProject";
import { _Post, _Project } from "@/types/_Post";
import CATEGORIES from "@/consts/CATEGORIES";
import { searchedPostsSelector } from "@/recoil/selectors/postsSelector";

const Search: FunctionComponent = () => {
    const params = useParams();
    const searchedPosts = useRecoilValue(searchedPostsSelector({ search_text: params.search_text }));
    const [recentFirst, setRecentFirst] = useState(true);
    const sortedPosts = useMemo(() => [...searchedPosts].sort((a, b) => (
        recentFirst ?
            (a.date_started < b.date_started ? 1 : -1)
            : (a.date_started > b.date_started ? 1 : -1))
    ), [searchedPosts, recentFirst])

    return (
        <main className="search-result">
            <header>
                <h2 className='content'>Search Result for { params.search_text }</h2>
                <button className="search-options accent" onClick={ () => {
                    setRecentFirst(!recentFirst);
                } }>
                    { recentFirst ?
                        <FaSortAmountDown /> :
                        <FaSortAmountUp />
                    }
                </button>
            </header>
            <ul>
                {
                    sortedPosts.length ?
                        sortedPosts.map((post: _Post, i) =>
                            post.category === CATEGORIES.PROJECT ?
                                <ListedProject key={ i } post={ post as _Project } />
                                : <ListedPost key={ i } post={ post } />
                        ) : <span>No post.</span>
                }
            </ul>
        </main>
    );
}

export default Search;