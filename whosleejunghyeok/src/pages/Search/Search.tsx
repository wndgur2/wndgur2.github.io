import { FunctionComponent, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import './Search.css';
import _Post from "../../types/_Post";
import ListedPost from "../../components/ListedPost";
import useSearchPosts from "../../hooks/useSearchPosts";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";

const Search: FunctionComponent = () => {
    const params = useParams();
    const posts = useSearchPosts(params);
    const [recentFirst, setRecentFirst] = useState(true);
    const sortedPosts = useMemo(() => {
        return posts.sort((a, b) => {
            if (recentFirst)
                return a.date_started < b.date_started ? 1 : -1;
            return a.date_started > b.date_started ? 1 : -1;
        });
    }, [posts, recentFirst])


    return (
        <main className="search-result">
            <header>
                <h2>Search Result for {params.search_text}</h2>
                <button className="search-options" onClick={() => {
                    setRecentFirst(!recentFirst);
                }}>
                    {recentFirst ?
                        <FaSortAmountDown /> :
                        <FaSortAmountUp />
                    }
                </button>
            </header>
            <ul>
                {sortedPosts.map((post: _Post, index) => (
                    <ListedPost post={post} key={index} />
                ))}
            </ul>
        </main>
    );
}

export default Search;