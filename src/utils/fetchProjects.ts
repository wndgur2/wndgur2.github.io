import PostsAction from "../types/PostsAction";
import {_Post} from "../types/_Post";
import fetchRawData from "./fetchRawData";

const fetchProjects = async (dispatch:React.Dispatch<PostsAction>) =>{
    let response = await fetch('/metadata.json');
    const data = await response.json();

    const posts:_Post[] = Object.values(data);

    posts.forEach(async (post) => {
        // load content
        await fetchRawData(`https://raw.githubusercontent.com/wndgur2/${post.title}/main/README.md`)
        .then((text) => {
            if(text === "" || text.startsWith('<!DOCTYPE html>'))
                post.content = "This post is not available.";
            else post.content = text;

            post.id = post.title;

            const img = new Image();
            img.src = "/images/" + post.title.toLowerCase() + ".jpeg";
            
            post.thumbnail = '<img src="' + img.src + '" alt="' + post.title + '" />';
            
            dispatch({type: "INSERT_POST", payload: post});
        })
    });

    return posts;
}
export default fetchProjects;