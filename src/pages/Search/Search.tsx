import { FunctionComponent, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import './Search.css';
import { _Post, _Project } from "../../types/_Post";
import ListedPost from "../../components/ListedPost";
import useSearchPosts from "../../hooks/useSearchPosts";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import ListedProject from "../../components/ListedProject";
import CATEGORIES from "../../consts/CATEGORIES";

const Search: FunctionComponent = () => {
    const params = useParams();
    const posts = useSearchPosts(params);
    const [recentFirst, setRecentFirst] = useState(true);
    const sortedPosts = useMemo(() => [...posts.sort((a, b) => (
        recentFirst ?
            (a.date_started < b.date_started ? 1 : -1)
            : (a.date_started > b.date_started ? 1 : -1))
    )], [posts, recentFirst])

    return (
        <main className="search-result">
            <header>
                <h2>Search Result for {params.search_text}</h2>
                <button className="search-options accent" onClick={() => {
                    setRecentFirst(!recentFirst);
                }}>
                    {recentFirst ?
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
                                <ListedProject key={i} post={post as _Project} />
                                : <ListedPost key={i} post={post} />
                        ) : <span>No post.</span>
                }
            </ul>
        </main>
    );
}

export default Search;