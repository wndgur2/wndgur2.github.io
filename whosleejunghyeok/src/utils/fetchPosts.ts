import _Post from "../types/_Post";
import fetchPostUrls from "./fetchPostsUrls";

const fetchPosts = async (setPosts:React.Dispatch<React.SetStateAction<_Post[]>>
):Promise<void> => {
    let urls = await fetchPostUrls();

    if(Object.prototype.toString.call(urls) === '[object Object]')
        urls = urls.urls;

    urls.pop();
    
    urls.forEach(async (url:string)=>{
        await fetchPost(url)
        .then((post) => {
            if(!post) return;
            setPosts((prevPosts:_Post[]):_Post[] => {
                if(prevPosts.find((prevPost:_Post) => prevPost.id === post.id)) return prevPosts;
                return [...prevPosts, post].sort((a:_Post, b:_Post) => {
                    if(a.date_started > b.date_started) return -1;
                    if(a.date_started < b.date_started) return 1;
                    return 0;
                });
            });
        })
        .catch((err) => console.log(err));
    });
}

const fetchPost = async (url:string) => {
    try{
        const response = await fetch("https://raw.githubusercontent.com/wndgur2/wndgur2.github.io/main/" + url);
        const data = await response.text();
        return getPost(data, url);
    } catch(err){
        console.log(err);
    }
}

const getPost = (data:string, url:string):_Post|null => {
    const post:_Post = {
        id: url,
        category: "other",
        title: "No title found.",
        content: "No content found.",
        tags: [],
        date_started: "No date found.",
        github: "https://github.com/wndgur2",
    };
    const header = data.match(/---\n(.+)\n---/s);
    if(header){
        const headerData = header[1].toString().split("\n");
        headerData.forEach((line:string) => {
            let [key, value] = line.split(": ");
            if(key==="category") value = value.toLowerCase();
            if(key && value)
                post[key] = key === "tags"? value.split(", "): value;
        });
    }
    else return null;


    const content = data.match(/---\n.+\n---\n(.+)/s);
    if(content)
        post.content = content[1].toString();

    post.github = "https://github.com/wndgur2/wndgur2.github.io/tree/main/" + url;
    
    if(post.category !== "algorithm") return post;
    

    const code_path = url.split("/");
    
    code_path.pop();

    post.tags.forEach((tag:string) => {
        switch(tag.toLowerCase()){
            case "c++":
                post.language = "cpp";
                break;
            case "python":
                post.language = "py";
                break;
            case "javascript":
                post.language = "js";
                break;
            case "c":
                post.language = "c";
                break;
            default:
                break;
        }
    });

    if(!post.language) return post;

    const filename = code_path[code_path.length - 1].replaceAll(" ", "");
    code_path.push(filename + '.' + post.language);
    fetch("https://raw.githubusercontent.com/wndgur2/wndgur2.github.io/main/" + code_path.join("/"))
    .then((response) => response.text())
    .catch((err) => {
        console.log(err);
        return "";
    })
    .then((data) => {
        post.code = data;
    })

    return post;
}


export default fetchPosts;