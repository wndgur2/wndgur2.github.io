---
category: Study
title: ReactJs
date_started: 2024.06.14
tags: ReactJs
---
> 출처: [React.dev](https://react.dev/)

## Hook
Hooks are special functions that are only available while React is rendering (which we’ll get into in more detail on the next page). They let you “hook into” different React features.  

State는 컴포넌트가 기억할 정보를 담는다.  
[(왜 그냥 js 변수로 쓰지 않는가?)](https://react.dev/learn/state-a-components-memory#when-a-regular-variable-isnt-enough)  
- `useState`  
    변수처럼 업데이트가 가능하다.  
    [`useState`는 매 랜더링마다 어떻게 state를 구분하는가? (id를 적는 것도 아닌데?)](https://react.dev/learn/state-a-components-memory#how-does-react-know-which-state-to-return)  
- `useReducer`  
    State를 변경하는 방식을 지정한다. Class에서 set property를 지정하는 것과 비슷하다.  

<br/>

###  `useEffect`
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

#### Redux: 상태 관리 툴 for browser. (vs Mobx(object-oriented))