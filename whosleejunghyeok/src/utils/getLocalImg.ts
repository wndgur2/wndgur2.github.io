import { _Project } from "../types/_Post";

const getLocalImg = async (url: string, post: _Project) => {
    const img = localStorage.getItem(url);
    // if(img) {
    //     post.thumbnail = '<img src="'+img+'" alt="'+post.title+'" />';
    //     return;
    // }
    try{
        const response = await fetch(url);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => {
            localStorage.setItem(url, reader.result as string);
            post.thumbnail = '<img src="'+reader.result+'" alt="'+post.title+'" />';
        }
        reader.onerror = () => {
            console.log("Error");
        }
    } catch(err){
        console.log("GET IMG FROM URL", err);
        post.thumbnail = '<img src="'+url+'" alt="'+post.title+'" />';
    }
}

export default getLocalImg;