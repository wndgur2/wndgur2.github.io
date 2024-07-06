async function fetchRawData(url:string){
    try{
        let response = await fetch(url);
        const text = await response.text();
        return text;
    } catch{
        console.error("Failed to load markdown");
        return "";
    }
}

export default fetchRawData;