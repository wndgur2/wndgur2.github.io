'use strict'

async function fetchData(){
    try{
        const res = await fetch("https://raw.githubusercontent.com/wndgur2/CatChess/main/server/modules/constants/cats.json");
        const json = await res.json();
        return json.stealthyStalker;
    } catch(err){
        console.error(err);
    }
}

const fetchPromise = fetchData();
setTimeout(()=>{
    console.log(fetchPromise);
}, 1000);

console.log("Do something without data.");