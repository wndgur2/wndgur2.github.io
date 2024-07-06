import { useEffect, useReducer } from "react";
import fetchPosts from "../utils/fetchPosts";
import fetchProjects from "../utils/fetchProjects";
import postsReducer from "../utils/postsReducer";

function usePosts() {
    const [posts, dispatch] = useReducer(postsReducer, []);

    useEffect(() => {
        fetchPosts(dispatch);
        fetchProjects(dispatch);
    }, []);

    return posts;
}

export default usePosts;