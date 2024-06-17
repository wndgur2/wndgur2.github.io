import { useEffect, useState } from "react";
import _Post from "../types/_Post";
import fetchPosts from "../utils/fetchPosts";
import fetchProjects from "../utils/fetchProjects";

function usePosts() {
    const [posts, setPosts] = useState<_Post[]>([]);

    useEffect(() => {
        fetchPosts(setPosts);
        fetchProjects(setPosts);
    }, []);

    return posts;
}

export default usePosts;