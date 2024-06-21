---
category: Study
title: ReactJs
date_started: 2024.06.14
tags: ReactJs
---
> 출처: [React.dev](https://react.dev/)

react.dev를 읽으며 내가 이해한 방식과 받은 인상을 녹였다.  

# Hook
Hooks are special functions that are only available while React is rendering (which we’ll get into in more detail on the next page). They let you “hook into” different React features.  

State는 컴포넌트가 기억할 정보를 담는다.
[(왜 그냥 js 변수를 쓰지 않는가?)](https://react.dev/learn/state-a-components-memory#when-a-regular-variable-isnt-enough)  

## State Hooks

### [`useState`](https://react.dev/reference/react/useState)

컴포넌트가 기억할 정보와 이를 업데이트할 수 있는 함수를 제공한다.  
[`useState`는 매 랜더링마다 어떻게 state를 구분하는가? (id를 적는 것도 아닌데?)](https://react.dev/learn/state-a-components-memory#how-does-react-know-which-state-to-return)  


### [`useReducer`](https://react.dev/reference/react/useReducer)  
State를 변경하는 방식을 지정한다. Class에서 set property를 지정하는 것과 비슷하다.  

[whosleejunghyeok](https://wndgur2.github.io/) 프로젝트의 data fetching에 이를 적용했다.  

한 포스트를 불러올 때마다 `posts` State를 업데이트해주고자 했는데, 이를 날짜순으로 정렬하기 원했다.  
기존에는 이를 아래와 같은 코드로 구현했다.  
``` jsx  
setPosts((prevPosts:_Post[]):_Post[] => {
    if(prevPosts.find((prevPost:_Post) => prevPost.id === post.id)) return prevPosts;
    return [...prevPosts, post].sort((a:_Post, b:_Post) => {
        if(a.date_started > b.date_started) return -1;
        if(a.date_started < b.date_started) return 1;
        return 0;
    });
});
```  
위 코드는 정렬 자체도 비효율적일 뿐더러(이미 정렬되어있는 것이 활용되지 않음) 같은 코드가 `fetchPosts`와 `fetchProjects`에 중복 작성되어있었다.  

위 코드는 아래처럼 단순해졌다.  
```jsx
dispatch({type: "INSERT_POST", payload: post});
```

`INSERT_POST`라는 action을 `postsReducer.ts`의 `reducer`에 정의했다.  
```ts  
const reducer = (state: _Post[], action: PostAction): _Post[] => {
    switch (action.type) {
        case 'INSERT_POST':
            // if post already exists, return state
            if(state.find((prevPost:_Post) => prevPost.id === action.payload.id)) return state;

            let index;
            while (left <= right) {
                index = Math.floor((left + right) / 2);
                if (state[index].date_started === action.payload.date_started) break;
                if (state[index].date_started < action.payload.date_started) right = index - 1;
                else left = index + 1;
            }
            return [...state.slice(0, index), action.payload, ...state.slice(index)];

        default:
            return state;
    }
}
```  
`ACTION`을 정의해 중복 코드를 방지하고 한김에 정렬 로직도 이진 탐색을 이용했다.  
코드 구분이 명확해졌고 확장성도 좋아졌다! posts를 마음껏 다뤄도 체계적으로 짤 수 있겠다는 상상이 든다.  

<br/>

## Ref Hooks
Refs let a component hold some information that isn’t used for rendering, like a DOM node or a timeout ID. Unlike with state, updating a ref does not re-render your component. Refs are an “escape hatch” from the React paradigm. They are useful when you need to work with non-React systems, such as the built-in browser APIs.  


### [`useRef`](https://react.dev/reference/react/useRef)  

declares a ref. You can hold any value in it, but most often it’s used to hold a DOM node.  


## Effect Hooks

###  `useEffect`

## Performance Hooks 

###  [`useMemo`](https://react.dev/reference/react/useMemo)  
`useMemo` vs `useEffect`&&`useState`  
    1. Purpose  
    `useEffect`: Manages side effects such as data fetching, subscriptions, or manual DOM manipulations.  
    `useMemo`: Memoizes a value so that it is recalculated only when its dependencies change. Used to optimize performance by avoiding expensive calculations on every render.
    2. Usage  
    `useEffect`: Runs a function after the component renders. Can run on every render or conditionally based on dependencies.  
    `useMemo`: is purely for performance optimization. It doesn't manage state or side effects but caches a computed value.
    3. Performance  
    흉내낼 순 있지만, 목적이 다르기 때문에, 값이 바뀌는 타이밍과 개선되는 성능이 다르다. 또 코드의 명확성을 따지면 useMemo만 쓰는 것이 당연히 좋다.

###  [`useCallback`](https://react.dev/reference/react/useCallback)  
In JavaScript, **a function () {} or () => {} always creates a different function**, similar to how the {} object literal always creates a new object. Normally, this wouldn’t be a problem, but it means that ShippingForm props will never be the same, and your memo optimization won’t work. This is where useCallback comes in handy.  
리랜더링 시 같은 함수를 계속 생성하는 것을 방지한다.  

###  Component
###  Custom Hook
###  Context

### Redux
상태 관리 툴 for browser. (vs Mobx(object-oriented))