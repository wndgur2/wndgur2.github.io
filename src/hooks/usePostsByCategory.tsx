import { useMemo } from "react";
import { _Post } from "../types/_Post";

const usePostsByCategory = (posts: _Post[]) => {
    const postsByCategory = useMemo(() => {
        const _postsByCategory: any = {};
        posts.forEach(post => {
            if (!_postsByCategory[post.category]) _postsByCategory[post.category] = [];
            else if (_postsByCategory[post.category].length > 10) return;
            _postsByCategory[post.category].push(post);
        });
        return _postsByCategory;
    }, [posts]);

    return postsByCategory;
}

export default usePostsByCategory;