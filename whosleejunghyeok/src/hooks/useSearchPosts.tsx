import { useContext, useMemo } from "react";
import { PostsContext } from "../contexts/Posts";
import { _Post } from "../types/_Post";
import { Params } from "react-router-dom";

function useSearchPosts(params: Readonly<Params<string>>) {

    const posts = useContext(PostsContext).posts as _Post[];

    const searchedPosts: _Post[] = useMemo(() => {
        if (!params.search_text) return [];
        const search_text = params.search_text.toLowerCase() as string;
        const search_words = search_text.split(" ") as string[];

        let result = posts;
        search_words.forEach((word) => {
            if (word.startsWith("#")) {
                result = result.filter((post: _Post) =>
                    post.tags.map((tag) => tag.toLowerCase()).includes(word.slice(1))
                );
            }
            else if (word.startsWith("@")) {
                result = result.filter((post: _Post) =>
                    post.category.toLowerCase() === word.slice(1)
                );
            }
            else {
                result = result.filter((post: _Post) =>
                    post.content.toLowerCase().includes(word) ||
                    post.title.toLowerCase().includes(word)
                );
            }
        });
        return result;
    }, [params, posts]);

    return searchedPosts;
}

export default useSearchPosts;