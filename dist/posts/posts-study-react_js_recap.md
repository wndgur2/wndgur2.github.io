
![dependency tree](https://github.com/user-attachments/assets/5d99aa13-5d32-4ad2-9902-0bdd7427845e)

React.dev를 정독하며, React 프로젝트에 바로 적용할 만한 내용들과 더 나은 프로젝트를 위해 이해해야하는 개념을 메모함.

개념이나 기능이 좋으면 메모한다기 보다는, *프로젝트를 진행하면서 이런 개념 혹은 기능이 필요했는데, 이런 식으로 풀이하는구나.* 하는 부분을 적음. *(바로 적용할 만한 내용)*.

혹은 *이건 꼭 이해하고 있어야겠다*. 하는 내용을 적음

# React

### Props
컴포넌트의 Props는 읽기 전용 스냅샷으로, ***렌더링 할 때마다 새로운 버전의 props***를 받습니다.

### Fragment (<></>의 명시적 문법)
각 항목이 하나가 아닌 여러 개의 DOM 노드를 렌더링해야 하는 경우에는 어떻게 해야 할까요?

짧은 <> </> fragment 구문으로는 key를 전달할 수 없으므로 key를 단일 <div>로 그룹화하거나 약간 더 길고 명시적인 <Fragment> 문법을 사용해야 합니다.

```jsx

import { Fragment } from 'react';

// ...

const listItems = people.map(person =>
 <Fragment key={person.id}>
   <h1>{person.name}</h1>
   <p>{person.bio}</p>
 </Fragment>
);
```

Fragment는 DOM에서 사라지므로 `<h1>, <p>, <h1>, <p>`등의 평평한 리스트가 생성됩니다.

### 배열 랜더링에서 key

*주의하세요!*

배열에서 항목의 인덱스를 key로 사용하고 싶을 수도 있습니다. **실제로 key를 전혀 지정하지 않으면 React는 인덱스를 사용합니다.**

하지만 항목이 삽입되거나 삭제하거나 배열의 순서가 바뀌면 시간이 지남에 따라 항목을 렌더링하는 순서가 변경됩니다. 인덱스를 key로 사용하면 종종 미묘하고 혼란스러운 버그가 발생합니다.

마찬가지로 key={Math.random()}처럼 즉석에서 key를 생성하지 마세요. 이렇게 하면 렌더링 간에 key가 일치하지 않아 모든 컴포넌트와 DOM이 ***매번 다시 생성될 수 있습니다***. 속도가 느려질 뿐만 아니라 리스트 항목 내부의 모든 사용자의 입력도 손실됩니다. 대신 데이터 기반의 안정적인 ID를 사용하세요.


### 의존성 트리

![dependency tree](https://github.com/user-attachments/assets/5d99aa13-5d32-4ad2-9902-0bdd7427845e)

앱이 커짐에 따라 번들 크기도 커집니다. 번들 크기가 커지면 클라이언트가 다운로드하고 실행하는 데 드는 비용도 커집니다. 또한 UI가 그려지는 데 시간이 지체될 수 있습니다. 앱의 의존성 트리를 파악하면 이러한 문제를 디버깅하는 데 도움이 될 수 있습니다.

### State Queue

***React는 이벤트 핸들러가 실행을 마친 후 state 업데이트를 처리합니다. 이를 batching 이라고 합니다.***

이벤트 핸들러가 완료되면 React는 리렌더링을 실행합니다. 리렌더링하는 동안 React는 큐를 처리합니다. 업데이터 함수는 렌더링 중에 실행되므로, 업데이터 함수는 순수해야 하며 결과만 반환 해야 합니다.

업데이터 함수 내부에서 state를 변경하거나 다른 사이드 이팩트를 실행하려고 하지 마세요. Strict 모드에서 React는 각 업데이터 함수를 두 번 실행(두 번째 결과는 버림)하여 실수를 찾을 수 있도록 도와줍니다.

### Event handler

*중요합니다!*

이벤트 핸들러에 적절한 HTML 태그를 사용하고 있는지 확인하세요. 예를 들어 클릭을 처리하기 위해서는 `<div onClick={handleClick}>` 대신 `<button onClick={handleClick}>`을 사용하세요.

실제 브라우저에서 `<button>`은 키보드 내비게이션과 같은 빌트인 브라우저 동작을 활성화 합니다. 만일 버튼의 기본 브라우저 스타일링이 싫어서 링크나 다른 UI 요소처럼 보이도록 하고 싶다면 CSS를 통해 그 목적을 이룰 수 있습니다. 

### Propagation

부여된 JSX 태그 내에서만 실행되는 `onScroll`을 제외한 React 내의 모든 이벤트는 전파됩니다.

- 드물게 전파가 중단된 상황일지라도 자식 컴포넌트의 모든 이벤트를 캡처해 확인해야 할 수 있습니다. 일례로, 분석을 위해 전파 로직에 상관 없이 모든 클릭 이벤트를 기록하고 싶을 수 있습니다. 이를 위해서는 이벤트명 마지막에 Capture를 추가하면 됩니다.
  ``` jsx
  <div onClickCapture={() => { /* this runs first */ }}>
    <button onClick={e => e.stopPropagation()} />
    <button onClick={e => e.stopPropagation()} />
  </div>
  ```
  각각의 이벤트는 세 단계를 거쳐 전파됩니다.

  - 아래로 전달되면서 만나는 모든 onClickCapture 핸들러를 호출합니다.
  - 클릭된 요소의 onClick 핸들러를 실행합니다.
  - 위로 전달되면서 만나는 모든 onClick 핸들러를 호출합니다.
  - 이벤트 캡처는 라우터나 분석을 위한 코드에 유용할 수 있지만 일반 애플리케이션 코드에서는 사용하지 않을 가능성이 높습니다.

### useReducer

[State 로직을 reducer로 작성하기](https://ko.react.dev/learn/extracting-state-logic-into-a-reducer)

여러 이벤트 핸들러를 통해 많은 state 업데이트가 이루어지는 컴포넌트는 감당하기 힘들 수 있습니다. 이 때 컴포넌트 외부에서 “reducer”라는 단일 함수를 사용하여 모든 state 업데이트 로직을 통합할 수 있습니다. 이벤트 핸들러는 오로지 사용자의 “action”만을 명시하므로 간결해집니다.

각 action에 대한 state 업데이트 방법은 파일 맨 마지막 부분의 reducer 함수에 명시되어 있습니다.

### [Reducer와 Context로 앱 확장하기](https://ko.react.dev/learn/scaling-up-with-reducer-and-context)
Reducer를 사용하면 컴포넌트의 state 업데이트 로직을 통합할 수 있습니다. Context를 사용하면 다른 컴포넌트에 정보를 깊숙이 전달할 수 있습니다. Reducer와 Context를 함께 사용하여 복잡한 화면의 state를 관리할 수 있습니다.

이 접근 방식을 사용하면 상위 컴포넌트가 Reducer로 복잡한 state를 관리합니다. 트리 깊은 곳에 있는 다른 컴포넌트는 Context를 통해 상위 컴포넌트의 state를 읽을 수 있습니다. 또한 해당 state를 업데이트하기 위해 action을 dispatch 할 수도 있습니다.

## [Escape-Hatches](https://ko.react.dev/learn/escape-hatches)

### useMemo()
계산이 비싼지 어떻게 알 수 있나요? 

일반적으로 수천 개의 객체를 만들거나 반복하는 경우가 아니라면 비용이 많이 들지 않을 것입니다. 좀 더 확신을 얻고 싶다면 console log를 추가하여 코드에 소요된 시간을 측정할 수 있습니다.

```js
console.time('filter array');
const visibleTodos = getFilteredTodos(todos, filter);
console.timeEnd('filter array');
```

측정하려는 상호작용을 수행합니다(예: input에 입력하기). 그러면 filter array: 0.15ms와 같은 로그가 console에 표시됩니다. 전체적으로 기록된 시간이 상당한 양(예: 1ms 이상)으로 합산되면 해당 계산을 메모이제이션하는 것이 좋습니다. 그런 다음 실험적으로 해당 계산을 useMemo로 감싸서 해당 상호작용에 대해 총 로깅 시간이 감소했는지를 확인할 수 있습니다.

```js
console.time('filter array');
const visibleTodos = useMemo(() => {
  return getFilteredTodos(todos, filter); // todos와 filter가 변경되지 않은 경우 건너뜁니다
}, [todos, filter]);
console.timeEnd('filter array');
```
useMemo는 첫 번째 렌더링을 더 빠르게 만들지 않습니다. 업데이트 시 불필요한 작업을 건너뛰는 데만 도움이 됩니다.

당신의 컴퓨터가 사용자의 컴퓨터보다 빠를 수 있으므로 인위적인 속도 저하로 성능을 테스트하는 것이 좋습니다. 예를 들어 Chrome은 이를 위해 CPU 스로틀링 옵션을 제공합니다.

또한 개발 중에 성능을 측정하는 것은 가장 정확한 결과를 제공하지 않는다는 점에 유의하세요. (예를 들어 Strict Mode를 켜면 각 컴포넌트가 한 번이 아닌 두 번 렌더링 되는 것을 볼 수 있습니다.) 가장 정확한 시간을 얻으려면 프로덕션용 앱을 빌드하고 사용자가 사용하는 것과 같은 기기에서 테스트하세요.

### key를 통한 state 초기화

prop 변경 시 모든 state 초기화 

이 ProfilePage 컴포넌트는 userId prop을 받습니다. 페이지는 댓글 입력을 포함하며 comment state 변수를 사용해 해당 값을 보관합니다. 어느 날 한 프로필에서 다른 프로필로 이동할 때 comment state가 재설정되지 않는 문제를 발견했습니다. 그 결과 실수로 잘못된 사용자의 프로필에 댓글을 게시하기 쉽습니다. 이 문제를 해결하기 위해 userId가 변경될 때마다 comment state 변수를 비우려고 합니다.

```jsx
export default function ProfilePage({ userId }) {
  const [comment, setComment] = useState('');

  // 🔴 피하세요: Effect에서 prop 변경 시 state 초기화
  useEffect(() => {
    setComment('');
  }, [userId]);
  // ...
}
```

이는 비효율적인데 ProfilePage와 그 자식이 오래된 값으로 처음 렌더링 한 다음 다시 렌더링 하기 때문입니다. 또한 ProfilePage 내부에 어떤 state가 있는 모든 컴포넌트에서 이 작업을 수행해야 하므로 복잡합니다. 예를 들어 댓글 UI가 중첩된 경우 중첩된 댓글 state도 비워야 합니다.

대신 명시적인 key를 전달하여 각 사용자의 프로필이 개념적으로 다른 프로필임을 React에 알릴 수 있습니다. 컴포넌트를 둘로 분할하고 외부 컴포넌트에서 내부 컴포넌트로 key 어트리뷰트를 전달하세요.

```jsx
export default function ProfilePage({ userId }) {
  return (
    <Profile
      userId={userId}
      key={userId}
    />
  );
}

function Profile({ userId }) {
  // ✅ 이 state 및 아래의 다른 state는 key 변경 시 자동으로 재설정됩니다.
  const [comment, setComment] = useState('');
  // ...
}
```
일반적으로 React는 동일한 컴포넌트가 같은 위치에 렌더링 될 때 state를 보존합니다. Profile 컴포넌트에 userId를 key로 전달하면 React가 userId가 다른 두 개의 Profile 컴포넌트를 state를 공유해서는 안 되는 두 개의 다른 컴포넌트로 취급하도록 요청하는 것입니다. userId로 설정한 key가 변경될 때마다 React는 DOM을 다시 생성하고 Profile 컴포넌트와 그 모든 자식의 state를 재설정합니다. 이제 프로필 사이를 탐색할 때 comment 필드가 자동으로 비워집니다.

이 예시에서는 외부 ProfilePage 컴포넌트만 내보내 프로젝트의 다른 파일에 표시된다는 점에 유의하세요. ProfilePage를 렌더링하는 컴포넌트는 key를 전달할 필요 없이 일반적인 prop로 userId를 전달합니다. ProfilePage가 이를 내부 Profile 컴포넌트에 key로 전달한다는 사실은 구현 세부 사항입니다.

### 연쇄 계산 

때때로 다른 state에 따라 각각 state를 조정하는 Effect를 체이닝하고 싶을 때가 있습니다.
```jsx
function Game() {
  const [card, setCard] = useState(null);
  const [goldCardCount, setGoldCardCount] = useState(0);
  const [round, setRound] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);

  // 🔴 피하세요: 서로를 트리거하기 위해서만 state를 조정하는 Effect 체인
  useEffect(() => {
    if (card !== null && card.gold) {
      setGoldCardCount(c => c + 1);
    }
  }, [card]);

  useEffect(() => {
    if (goldCardCount > 3) {
      setRound(r => r + 1)
      setGoldCardCount(0);
    }
  }, [goldCardCount]);

  useEffect(() => {
    if (round > 5) {
      setIsGameOver(true);
    }
  }, [round]);

  useEffect(() => {
    alert('Good game!');
  }, [isGameOver]);

  function handlePlaceCard(nextCard) {
    if (isGameOver) {
      throw Error('Game already ended.');
    } else {
      setCard(nextCard);
    }
  }

  // ...
```
이 코드에는 두 가지 문제가 있습니다.

첫 번째 문제는 매우 비효율적이라는 점입니다. 컴포넌트(및 그 자식)는 체인의 각 set 호출 사이에 다시 렌더링해야 합니다. 위의 예시에서 최악의 경우(setCard → 렌더링 → setGoldCardCount → 렌더링 → setRound → 렌더링 → setIsGameOver → 렌더링)에는 아래 트리의 불필요한 리렌더링이 세 번 발생합니다.

두 번째 문제는 속도가 느리지 않더라도 코드가 발전함에 따라 작성한 “체인”이 새로운 요구 사항에 맞지 않는 경우가 발생할 수 있다는 점입니다. 게임 이동의 기록을 단계별로 살펴볼 수 있는 방법을 추가한다고 가정해 보겠습니다. 각 state 변수를 과거의 값으로 업데이트하여 이를 수행할 수 있습니다. 하지만 card state를 과거의 값으로 설정하면 Effect 체인이 다시 트리거되고 표시되는 데이터가 변경됩니다. 이러한 코드는 융통성이 없고 취약한 경우가 많습니다.

이 경우 렌더링 중에 가능한 것을 계산하고 이벤트 핸들러에서 state를 조정하는 것이 좋습니다.
```jsx
function Game() {
  const [card, setCard] = useState(null);
  const [goldCardCount, setGoldCardCount] = useState(0);
  const [round, setRound] = useState(1);

  // ✅ 렌더링 중에 가능한 것을 계산합니다.
  const isGameOver = round > 5;

  function handlePlaceCard(nextCard) {
    if (isGameOver) {
      throw Error('Game already ended.');
    }

    // ✅ 이벤트 핸들러에서 다음 state를 모두 계산합니다.
    setCard(nextCard);
    if (nextCard.gold) {
      if (goldCardCount <= 3) {
        setGoldCardCount(goldCardCount + 1);
      } else {
        setGoldCardCount(0);
        setRound(round + 1);
        if (round === 5) {
          alert('Good game!');
        }
      }
    }
  }

  // ...
```
훨씬 더 효율적입니다. 또한 게임 기록을 볼 수 있는 방법을 구현하면 이제 다른 모든 값을 조정하는 Effect 체인을 트리거 하지 않고도 각 state 변수를 과거의 행동으로 설정할 수 있습니다. 여러 이벤트 핸들러 간에 로직을 재사용해야 하는 경우 함수를 추출하여 해당 핸들러에서 호출할 수 있습니다.

이벤트 핸들러 내부에서 state는 스냅샷처럼 동작한다는 점을 기억하세요. 예를 들어 `setRound(round + 1)`를 호출한 후에도 round 변수는 사용자가 버튼을 클릭한 시점의 값을 반영합니다. 계산에 다음 값을 사용해야 하는 경우 `const nextRound = round + 1`처럼 수동으로 정의하세요.

이벤트 핸들러에서 직접 다음 state를 계산할 수 없는 경우도 있습니다. 예를 들어 여러 개의 드롭 다운이 있는 폼에서 다음 드롭 다운의 옵션이 이전 드롭 다운의 선택된 값에 따라 달라진다고 가정해 보겠습니다. 이 경우 네트워크와 동기화하기 때문에 Effect 체인이 적절합니다.

### 애플리케이션 초기화 
일부 로직은 앱이 로드될 때 한 번만 실행되어야 합니다.

그것을 최상위 컴포넌트의 Effect에 배치하고 싶을 수도 있습니다.
```jsx
function App() {
  // 🔴 피하세요: 한 번만 실행되어야 하는 로직이 포함된 Effect
  useEffect(() => {
    loadDataFromLocalStorage();
    checkAuthToken();
  }, []);
  // ...
}
```
하지만 이 함수가 개발 중에 두 번 실행된다는 사실을 금방 알게 될 것입니다. 함수가 두 번 호출되도록 설계되지 않았기 때문에 인증 토큰이 무효화되는 등의 문제가 발생할 수 있습니다. 일반적으로 컴포넌트는 다시 마운트 할 때 탄력이 있어야 합니다. 여기에는 최상위 App 컴포넌트가 포함됩니다.

프로덕션 환경에서 실제로 다시 마운트되지 않을 수도 있지만 모든 컴포넌트에서 동일한 제약 조건을 따르면 코드를 이동하고 재사용하기가 더 쉬워집니다. 일부 로직이 컴포넌트 마운트당 한 번이 아니라 앱 로드당 한 번 실행되어야 하는 경우 최상위 변수를 추가하여 이미 실행되었는지를 추적하세요.

```jsx
let didInit = false;

function App() {
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      // ✅ 앱 로드당 한 번만 실행
      loadDataFromLocalStorage();
      checkAuthToken();
    }
  }, []);
  // ...
}
모듈 초기화 중이나 앱이 렌더링 되기 전에 실행할 수도 있습니다.

if (typeof window !== 'undefined') { // 브라우저에서 실행 중인지 확인합니다.
   // ✅ 앱 로드당 한 번만 실행
  checkAuthToken();
  loadDataFromLocalStorage();
}

function App() {
  // ...
}
```
컴포넌트를 import 할 때 최상위 레벨의 코드는 렌더링 되지 않더라도 한 번 실행됩니다. 임의의 컴포넌트를 import 할 때 속도 저하나 예상치 못한 동작을 방지하려면 이 패턴을 과도하게 사용하지 마세요. app 전체 초기화 로직은 App.js와 같은 루트 컴포넌트 모듈이나 애플리케이션의 엔트리 포인트에 두세요.

# Javascript

### Hoisting
- var, let, const 모두 호이스팅되나, var만 undefined로 초기화된다. 나머지는 초기화되지 않으므로, initialization 전에 참조할 수 없다는 `Reference Error`가 발생한다.
- function은 선언 뿐만 아니라 정의도 맨 위로 올라간다.
- const fn = ()=>{} 문법은 const와 동일하게 작동한다.

### Array.filter(fn)
- fn이 true를 리턴하는 원소만 모은 배열을 리턴한다.

### Array.from(iterable || array-like object, mapFunction)

```js
console.log(Array.from("foo"));
// Expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], (x) => x + x));
// Expected output: Array [2, 4, 6]
```

# 참고자료
- [React.dev](https://ko.react.dev/learn)