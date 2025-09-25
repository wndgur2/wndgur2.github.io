
<img src='https://github.com/user-attachments/assets/8f8c6115-e777-42cf-9187-11974be227b6' alt='recoil' width='200px' />

# Recoil이란?

**Recoil**은 React를 위한 상태 관리 라이브러리로, 컴포넌트 간의 상태를 공유하거나 상태 기반의 파생 데이터를 효율적으로 관리할 수 있도록 설계되었습니다. Recoil은 상태를 **Atom**(상태 단위)과 **Selector**(순수 함수)로 구성하며, 이를 통해 데이터 흐름 그래프를 생성합니다.

---

## Core Concepts

### 1. Atoms
**Atoms**는 상태의 기본 단위로, **업데이트 가능**하며 **구독 가능**합니다.
- 컴포넌트가 Atom에 구독되면, Atom이 변경될 때 해당 컴포넌트가 재렌더링됩니다.
- Atom은 React의 `useState`처럼 동작하지만, 여러 컴포넌트에서 공유할 수 있다는 점이 다릅니다.
- Atom은 **유일한 키(key)**와 **기본값(default)**으로 정의됩니다.

#### 주요 특징
- 컴포넌트 간 상태 공유 가능.
- 런타임 중 생성 가능.
- 전역적으로 고유한 키 필요.

#### Atom 정의
Atom은 `atom()` 함수를 사용해 생성됩니다. 아래는 간단한 예시입니다:

```javascript
const fontSizeState = atom({
  key: 'fontSizeState',
  default: 14,
});
```

1. Atom은 고유한 키를 가져야 합니다.
2. 기본값은 초기 상태를 정의합니다.

#### Atom 읽기 및 쓰기
`useRecoilState()` 훅을 사용하여 Atom의 값을 읽거나 업데이트할 수 있습니다. 

```javascript
function FontButton() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  return (
    <button onClick={() => setFontSize((size) => size + 1)} style={{ fontSize }}>
      Click to Enlarge
    </button>
  );
}
```

---

### 2. Selectors
**Selectors**는 순수 함수로, Atom이나 다른 Selector를 입력받아 파생 데이터를 계산합니다.
- **파생 데이터(derived data)**: 저장된 최소 상태에서 계산된 데이터.
- Selectors는 Atom과 동일한 방식으로 컴포넌트에서 구독 가능하며, 데이터 변경 시 재계산됩니다.

#### 주요 특징
- 중복된 상태를 방지하고, 효율적인 데이터 관리를 지원.
- Atom 및 다른 Selector 의존성을 추적하여 필요한 경우에만 재계산.

#### Selector 정의
Selector는 `selector()` 함수로 정의됩니다. 아래는 Atom의 값을 기반으로 포맷된 문자열을 반환하는 예시입니다:

```js
const fontSizeLabelState = selector({
  key: 'fontSizeLabelState',
  get: ({ get }) => {
    const fontSize = get(fontSizeState);
    const unit = 'px';
    return `${fontSize}${unit}`;
  },
});
```

1. Selector는 고유한 키를 가져야 합니다.
2. `get` 속성으로 계산 로직을 정의합니다.
3. `get` 함수는 다른 Atom이나 Selector 값을 참조합니다.

#### Selector 값 읽기
Selector 값은 `useRecoilValue()` 훅을 사용해 읽을 수 있습니다.

```js
function FontButton() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  const fontSizeLabel = useRecoilValue(fontSizeLabelState);

  return (
    <>
      <div>Current font size: {fontSizeLabel}</div>
      <button onClick={() => setFontSize((size) => size + 1)} style={{ fontSize }}>
        Click to Enlarge
      </button>
    </>
  );
}
```

---

## Recoil의 장점
1. **유연성**: React의 로컬 상태 관리처럼 간단하면서도 전역 상태를 쉽게 관리할 수 있습니다.
2. **확장성**: 대규모 애플리케이션에서도 효율적인 상태 관리 가능.
3. **효율성**: 의존성 기반으로 필요한 경우에만 재계산.

---

### 📝 용어 설명
- **Atom**: Recoil의 기본 상태 단위. React의 `useState`와 비슷하지만, 공유 가능한 상태.
- **Selector**: Atom이나 다른 Selector를 기반으로 계산된 파생 데이터를 제공하는 순수 함수.
- **Derived Data**: 최소 상태에서 계산된 데이터.

Recoil은 간단한 API와 React 친화적인 방식으로, 상태 관리의 복잡성을 크게 줄여줍니다. ✨


# motivation

> 개인 블로그 프로젝트 상태 관리 방식으로 redux, recoil 그리고 react의 useContext를 고려했습니다.  

## Redux, Recoil, useContext 비교

| 특징                          | Redux                                                                | Recoil                                                  | useContext                                                               |
|-------------------------------|----------------------------------------------------------------------|---------------------------------------------------------|---------------------------------------------------------------------------|
| **목적**                       | 복잡한 애플리케이션을 위한 상태 관리                              | React에 최적화된 상태 관리                               | 컴포넌트 간 상태를 prop drilling 없이 공유                               |
| **학습 곡선**                  | 가파름, 액션, 리듀서, 미들웨어를 이해해야 함                       | 중간, React 개발자는 쉽게 배울 수 있음              | 쉬움, 설정이 최소화되어 있음                                             |
| **상태 세분화**                | 중앙집중식 상태, 상태 변경 시 전체 상태 트리 업데이트             | 세분화된 atom 기반 상태 업데이트                        | 상태 변경 시 모든 소비자에게 영향을 미침                                 |
| **성능**                       | 최적화하지 않으면 불필요한 리렌더링이 발생할 수 있음               | React 최적화, 불필요한 리렌더링 방지                    | 상태 변경 시 모든 소비자 리렌더링이 발생할 수 있음                       |
| **미들웨어 지원**             | 강력함, 많은 커뮤니티에서 만든 미들웨어 사용 가능                 | 직접적인 미들웨어 지원 없음, React 효과 사용           | 해당 없음                                                                |
| **비동기 처리**                | redux-thunk 또는 redux-saga와 같은 미들웨어 필요                  | 비동기 셀렉터에 대한 내장 지원                           | 비동기 처리는 수동으로 처리해야 함                                        |
| **확장성**                     | 대형, 복잡한 애플리케이션에 적합                                   | 중형에서 대형 애플리케이션에 적합                        | 작은 또는 중형 애플리케이션에 적합                                       |
| **설정 복잡도**                | 스토어, 리듀서, 액션, 미들웨어 설정이 필요                       | 최소 설정, React 훅 사용                                 | 설정이 매우 간단                                                       |
| **TypeScript 지원**           | 강력함, 액션과 리듀서의 타입 정의 필요                             | 좋은 지원, atom/selector에 대한 타입 지원               | 직관적, useContext는 React의 타입 정의와 바로 통합                        |
| **사용 사례**                  | 복잡한 상태 흐름을 가진 중앙집중식 상태 관리에 적합               | 분산형 상태 관리, React 최적화된 워크플로우             | 간단한 전역 상태 공유, 추가 라이브러리 필요 없음                         |


> 프로젝트의 사이즈가 작고 state의 insert가 한 번 일어난다는 점에서 보다 단순한 방법 recoil을 채택했습니다.

---

### 참고 자료
- https://recoiljs.org/