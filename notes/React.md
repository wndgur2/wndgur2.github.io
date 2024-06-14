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