import { createContext } from "react";
import { _Post } from "../types/_Post";

export const PostsContext = createContext<{
    posts: _Post[];
}>({
    posts: [],
});