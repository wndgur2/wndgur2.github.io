To learn  
- How browser render a page  
- How react build/render a page  
- Html(MDN)  
- Vue.js  

# WEB
- The browser parses the HTML file first, and that leads to the browser recognizing any `<link>`-element references to external CSS stylesheets and any `<script>`-element references to scripts.
- As the browser parses the HTML, it sends requests back to the server for any CSS files it has found from `<link>`elements, and any JavaScript files it has found from `<script>` elements, and from those, then parses the CSS and JavaScript.
- The browser generates an in-memory [DOM(Document Object Model)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) tree from the parsed HTML, generates an in-memory CSSOM structure from the parsed CSS, and compiles and executes the parsed JavaScript.
As the browser builds the DOM tree and applies the styles from the CSSOM tree and executes the JavaScript, a visual representation of the page is painted to the screen, and the user sees the page content and can begin to interact with it.


# HTML: HyperText Markup Language

HTML (HyperText Markup Language) is the most basic building block of the Web. It defines the meaning and **structure of web content**. Other technologies besides HTML are generally used to describe a web page's appearance/presentation (CSS) or functionality/behavior (JavaScript).

"Hypertext" refers to links that connect web pages to one another, either within a single website or between websites. Links are a fundamental aspect of the Web. By uploading content to the Internet and linking it to pages created by other people, you become an active participant in the World Wide Web. - MDN

HTML에는 별도의 기능이 없는 엘리먼트가 꽤 있다. (article, section, div, etc.) 이런 엘리먼트는 왜 존재할까?  
Semantic 프로그래밍은, 코드를 보고 그 의미를 이해하기 쉽도록 만든다. 특히나 Html 코드는, 사람 뿐만 아니라 검색 엔진이 레이팅할 때에도 사용되기 때문에 의미가 명확해질 수록 좋다.  
Semantics is about whether or not the sentence has a valid meaning -Sazonov Nikita
- `<header>`
- `<body>`
- `<footer>`
- `<article>`
- `<section>`
- `<search>`
- `<detail> <summary>` name prop
- `<input> <datalist>`

# Javascript

## Object
- `keys()`
- `values()`

### Array
- `concat()`
- `reduce()`

### Promise & async
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

# CSS

## Property
- `flex`
- `flex-shrink`
- `flex-grow`
- `flex-basis`
- `flex-flow`: `flex-direction`, `flex-grow`
- `color: var(--variable-name)`: custom variable

## 단위
- `px`: pixel
- `vw`, `vh`: viewport width/height
- `dvw`, `dvh`: dynamic viewport width/height
- `%`: percentage of the parent's property.
- `em`: font-size
- `rem`: font-size of `<html>`

## Media queries

- `width`(`360px`)
- `resolution`(`150dpi`)
- `pointer`(`fine`, `coarse`)
- `orientation`(`landscape`, `potrait`)

# React

- `useEffect`
- `useState`
- [`useMemo`](https://react.dev/reference/react/useMemo)  
`useMemo` vs `useEffect`&&`useState`  
    1. Purpose  
    `useEffect`: Manages side effects such as data fetching, subscriptions, or manual DOM manipulations.  
    `useMemo`: Memoizes a value so that it is recalculated only when its dependencies change. Used to optimize performance by avoiding expensive calculations on every render.
    2. Usage  
    `useEffect`: Runs a function after the component renders. Can run on every render or conditionally based on dependencies.  
    `useMemo`: is purely for performance optimization. It doesn't manage state or side effects but caches a computed value.
    3. Performance  
    흉내낼 순 있지만, 목적이 다르기 때문에, 값이 바뀌는 타이밍과 개선되는 성능이 다르다. 또 코드의 명확성을 따지면 useMemo만 쓰는 것이 당연히 좋다.

- [`useCallback`](https://react.dev/reference/react/useCallback)  
In JavaScript, **a function () {} or () => {} always creates a different function**, similar to how the {} object literal always creates a new object. Normally, this wouldn’t be a problem, but it means that ShippingForm props will never be the same, and your memo optimization won’t work. This is where useCallback comes in handy - react.dev  
리랜더링 시 같은 함수를 계속 생성하는 것을 방지.
- Component
- Custom Hook
- Context

#### Redux: 상태 관리 툴 for browser. (vs Mobx(object-oriented))

# Markdown

- ` `` `: code snippet
- ` ```  ``` `: code block
```javascript
console.log("hello world!");
```
- `---`: 분리선  

---  
  
# # x
## ## x
### ### x
#### #### x
##### ##### x
###### ###### x

# Express.js
- view engine
- controller
- router

# Theories

## SSR (vs CSR)

# Mindset

개척자 정신? 예전에 Linchpin이라는 책에서 들은 적이 있다. 개발이라는 세상은 너무나 방대하다. 웹 프론트엔드 개발자라고 해서 자신을 React, HTML, CSS 같은 것에 한정짓는 것은 바보다. 기술은 흘러간다. 가치를 높이는 것은, 기술을 빠르게 익히는 능력과, 사람들과 같이 일하는 능력, 큰 틀에서 바라볼 줄 아는 능력, 양보할 줄 아는 여유, 다시 일어설 수 있는 투지, 도전을 즐기고 투자할 줄 아는 배짱. 이런 것들이 아닐까?