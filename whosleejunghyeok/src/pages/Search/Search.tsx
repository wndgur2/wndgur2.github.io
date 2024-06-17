import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import './Search.css';
import _Post from "../../types/_Post";
import ListedPost from "../../components/ListedPost";
import useSearchPosts from "../../hooks/useSearchPosts";

const Search: FunctionComponent = () => {
    const params = useParams();
    const posts = useSearchPosts(params);

    return (
        <div className="search-result">
            <h2>Search Result for {params.search_text}</h2>
            <ul>
                {posts.map((post: _Post, index) => (
                    <ListedPost post={post} key={index} />
                ))}
            </ul>
        </div>
    );
}

export default Search;