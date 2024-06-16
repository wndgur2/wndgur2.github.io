---
category: Study
title: Javascript
date_started: 2024.06.14
tags: Javascript
---
# Javascript

## Object
- `keys()`
- `values()`

## Array
- `concat()`
- `reduce()`

## Promise & async
async function은 말 그대로 비동기로 수행하는 함수를 의미한다.  
시간이 많이 걸리는 작업(ex: data fetching)은 비동기로 처리하여 페이지 로딩 시간을 단축시킨다. 아마 이런 코드일 것이다.   
```javascript
async function fetchData(){
    try{
        const res = await fetch("https://raw.githubusercontent.com/wndgur2/CatChess/main/server/modules/constants/cats.json");
        return await res.json();
    } catch(err){
        console.error(err);
    }
}

fetchData()
.then(data=>{
        console.log(data.royalBellyRubber);
});

console.log("Do something without data.");
```

가져온 데이터를 보여주고 싶으면, `data`를 가져왔을 때 `data`를 출력하면 될 것이다.

### .then()
.then()을 ***비동기 함수에 붙혀서*** 사용하면, ***리턴값***을 받아 콜백함수를 실행한다.

우리가 알던 일반적인 함수는, `return` 다음의 값을 `return`한다. 그런데 `async function`은 그렇지 않다.

```js
async function fetchData(){
    try{
        const res = await fetch("https://raw.githubusercontent.com/wndgur2/CatChess/main/server/modules/constants/cats.json");
        return await res.json();
    } catch(err){
        console.error(err);
    }
}

console.log(fetchData()); // 출력: Promise { <pending> }
```

모든 `async function`은 `Promise` 객체를 리턴한다.  

[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)는 비동기 작업의 **상태**(완료 또는 실패)와 그 **결과값**을 나타내는 자바스크립트 오브젝트이다.  

위 예에서는 고양이 정보를 다 가져왔는지(상태)와, 가져왔다면 그 결과값을 담고 있다.  

그래서 `fetchData()`를 실행하자마자 출력하면 `pending`(미완료) 상태의 `Promise` 객체가 출력된다.  

`Promise`의 메서드 `then()`은 이를 `fulfilled` 상태가 될 때까지 기다리고, 그 결과값을 가져온다.  

React에선 이렇게 사용될 수 있다.

```jsx

function App() {
    const [data, setData] = useState();

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("https://fetching.url");
            const json = await res.json();
            setData(json);
        }
        fetchData();
    }, []);

    // ...
}
```

## Event

### e.preventDefault()
엘리멘트별 기본 행동을 제거함. ex) 체크박스를 클릭해도 체크가 안 되도록  
이를 이용해 중첩 click event를 처리할 수 있다.  
중첩된 엘리먼트가 있으면, 기본 설정이 둘 다 발생하게 되어있다.  
이는 e.stopPropagation()으로 방지할 수 있다.
그러나 부모가 a태그일 경우엔 stopPropagation으로도 방지할 수 없는데,
이는 preventDefault로 방지할 수 있다.

```html
<a id="parent" href="https://naver.com">
    <button id="child">
        Click Me!
    </button>
</a>
<script>
    const handleClick = (e) => {
        e.preventDefault();
        console.log('Button Clicked');
    }
    document.getElementById('child').addEventListener('click', handleClick);
</script>
```