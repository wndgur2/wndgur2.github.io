import _Post from "../types/_Post";
import fetchPostUrls from "./fetchPostsUrls";

const fetchPosts = async (setPosts:React.Dispatch<React.SetStateAction<_Post[]>>
):Promise<void> => {
    let urls = await fetchPostUrls();

    if(Object.prototype.toString.call(urls) === '[object Object]')
        urls = urls.urls;
    
    urls.forEach(async (url:string)=>{
        await fetchPost(url)
        .then((post) => {
            if(!post) return;
            setPosts((prevPosts:_Post[]):_Post[] => {
                if(prevPosts.find((prevPost:_Post) => prevPost.id === post.id)) return prevPosts;
                return [...prevPosts, post];
            });
        });
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
            const [key, value] = line.split(": ");
            if(key && value)
                post[key] = key === "tags"? value.split(", "): value;
        });
    }
    else return null;


    const content = data.match(/---\n.+\n---\n(.+)/s);
    if(content)
        post.content = content[1].toString();

    post.github = "https://github.com/wndgur2/wndgur2.github.io/tree/main/" + url;

        const code_path = url.split("/");
        code_path.pop();

        let ext = ".";
        post.tags.forEach((tag:string) => {
            switch(tag.toLowerCase()){
                case "c++":
                    ext = ".cpp";
                    break;
                case "python":
                    ext = ".py";
                    break;
                case "javascript":
                    ext = ".js";
                    break;
                case "c":
                    ext = ".c";
                    break;
                default:
                    break;
            }
        });
        code_path.push(code_path[-1] + ext);
        console.log(code_path.join("/"));
        fetch(code_path.join("/"))
        .then((response) => response.text())
        .catch((err) => {
            console.log(err);
            return "";
        })
        .then((data) => {
            post.code = data;
            console.log("code data:", data);
        })

    return post;
}


export default fetchPosts;