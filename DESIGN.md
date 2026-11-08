# 디자인 시스템

이 블로그의 스타일 규칙이다. 토큰은 `src/styles/tokens.css`, 전역 스타일은 `src/index.css`, 공용 컴포넌트는 `src/components/common`에 있다.

## 토큰

| 종류 | 이름 | 위치 |
| --- | --- | --- |
| 모서리 | `--radius-*`, `--radius` | `:root` |
| 간격 | `--space-*` (숫자 / 10 = em, `--space-5`는 0.5em) | `:root` |
| 글자 크기 | `--font-size-*` (부모 기준), `--font-size-root-*` (루트 기준) | `:root` |
| 시간 | `--duration-*` | `:root` |
| 쌓임 순서 | `--z-*` | `:root` |
| 포커스 표시 | `--focus-ring-width`, `--focus-ring-offset` | `:root` |
| 색상 | `--color-*` | `[data-theme]` |
| 그림자 | `--shadow`, `--shadow-*` | `[data-theme]` |

- 테마와 무관한 값은 `:root`에, 테마별 값은 `[data-theme="light"]`와 `[data-theme="dark"]` 양쪽에 추가한다.
- `data-theme`은 `html` 요소에 붙는다. `index.html`의 인라인 스크립트가 첫 렌더 전에 정하고 `ThemeProvider`가 갱신한다. 사용자가 토글로 고른 값이 `localStorage`에 있으면 그 값을, 없으면 시스템 설정(`prefers-color-scheme`)을 따른다.
- `index.html`에는 CSS가 로드되기 전 첫 화면 배경으로 `--color-bg` 값이 그대로 적혀 있다. `--color-bg`를 바꾸면 함께 바꾼다. `src/styles/theme.test.ts`가 두 값이 같은지 검사한다.
- 본문 크기 글자에 쓰는 색(`--color-text*`, `--color-accent`, `--color-action`, `--color-link`)은 `--color-bg`와 `--color-surface` 위에서 4.5:1 이상을 유지한다.
- `tokens.css`에 추가하면 Stylelint 허용 목록에 자동으로 들어간다.
- 쓰는 곳이 없어진 토큰은 지운다.

## 스타일 작성

- 컴포넌트 스타일은 같은 폴더의 `*.module.css`에 쓴다. 전역 CSS를 새로 늘리지 않는다.
- `src/index.tsx`는 `tokens.css`, `index.css` 순서로 불러온다. 모듈 CSS는 그 뒤에 로드되어 같은 우선순위의 전역 유틸리티를 덮어쓰므로 이 순서를 바꾸지 않는다.

전역 유틸리티는 `src/index.css`에 있고 문자열 클래스로 쓴다.

| 클래스 | 쓰임 |
| --- | --- |
| `link` | 링크 색과 포인터. 호버하면 안쪽 `header`가 강조색으로 바뀐다. |
| `minor` | 흐린 글자색 |
| `icon` | 아이콘 색 |
| `content` | 본문 글자색 |
| `dimmed content` | 조금 흐린 본문 글자색. 두 클래스를 함께 쓴다. |
| `clickable` | 포인터와 호버 확대 |
| `clickable small` | 작은 요소용 호버 확대. 두 클래스를 함께 쓴다. |
| `skeleton` | 로딩 스켈레톤 배경 |

### 부모가 자식을 꾸미는 방법

청크 로드 순서는 이동 경로에 따라 달라지므로, 우선순위가 같은 규칙끼리 부딪히게 두지 않는다.

- 자식이 정의하지 않은 속성(`margin`, `flex-grow` 등)은 자식의 `className` prop으로 넘긴다.
- 자식이 정의한 속성을 바꿔야 하면 지역 커스텀 프로퍼티를 쓴다. 예: `.listItem`의 `--preview-max-height`와 `PostListItem`의 `var(--preview-max-height, 12em)`.
- `Button`과 `IconButton`은 기본 규칙을 `button:where(.button)`으로 써서 우선순위가 요소 선택자와 같다. 어떤 속성이든 `className`으로 덮어쓸 수 있다.
- 다른 컴포넌트의 내부 구조를 선택자로 건드리지 않는다. 예외는 `Card`의 `.card a:not(.cardLink)`이다. 카드 안의 링크를 `CardLink` 위로 올리는 데 필요하다.

## Stylelint

`pnpm lint:css`로 검사하고 설정은 `stylelint.config.js`에 있다.

- 색상값(16진수, 색 이름, `rgb()` 등)을 직접 쓸 수 없다.
- `font-size`, `z-index`, `box-shadow`, `border-radius`는 해당 토큰을 쓴다.
- `transition`, `animation`의 시간과 `gap`, `padding`, `margin`의 `em` 값은 토큰을 쓴다. 뷰포트 단위나 `%`와 섞인 `calc()`는 허용한다.
- `tokens.css`에 없는 커스텀 프로퍼티는 쓸 수 없다. 지역 변수는 `stylelint.config.js`의 `LOCAL_CUSTOM_PROPERTIES`에 추가한다.

의도한 고정값은 바로 윗줄에 이유를 적은 주석을 단다. 이유가 없거나 필요 없어진 주석은 검사에서 실패한다.

```css
/* stylelint-disable-next-line color-no-hex -- 사진과 영상의 바탕이라 테마와 무관하게 흰색으로 고정한다. */
background-color: #fff;
```

## 공용 컴포넌트

| 컴포넌트 | 쓰임 |
| --- | --- |
| `Button` | 글자가 있는 버튼. `type` 기본값은 `button`이고 폼 제출에는 `submit`을 넘긴다. |
| `IconButton` | 아이콘이나 이미지만 있는 정사각형 버튼. `label`이 필수이고 `aria-label`로 렌더링된다. 그 밖에는 `Button`과 같다. |
| `Card`, `CardLink` | 목록 항목 카드. 루트가 `li`이므로 목록 안에서 쓴다. `CardLink`로 제목을 감싸면 카드 전체가 그 링크로 동작한다. |
| `Tag` | 태그 검색 결과로 가는 링크. 현재 검색에 포함된 태그는 강조되고 `aria-current`가 붙는다. |
| `TagList`, `TagCountList` | 태그 목록. `TagCountList`는 게시글 수를 함께 보여주고 화면에 들어올 때 나타난다. |
| `IconLink` | 아이콘 외부 링크. `label`이 필수이고 `aria-label`로 렌더링된다. |
| `SkipLink` | 건너뛰기 링크. 포커스를 받을 때만 보이고, 누르면 `targetId` 요소로 포커스를 옮긴다. 대상에는 `tabIndex={-1}`을 달고 `:focus`의 `outline`을 없앤다. 기본 위치는 화면 왼쪽 위 고정이며 `className`으로 바꿀 수 있다. |
| `Spinner`, `TextSkeleton` | 로딩 표시 |
| `Toast` | 잠깐 나타나는 알림 |
| `IntersectionObserverWrapper` | 화면에 들어오면 클래스를 붙이는 래퍼 |

- 버튼은 `<button>`을 직접 쓰지 않고 `Button`이나 `IconButton`을 쓴다.
- 클릭할 수 있는 요소는 `div`에 `onClick`을 달지 않고 `button`이나 `a`로 만든다.
- 링크나 버튼을 다른 링크 안에 넣지 않는다. 카드 안에 넣어야 하면 `CardLink` 밖에 둔다.
- `Button`, `IconButton`, `Tag`, `Card`, `SkipLink`, `ThemeToggler`에는 `:focus-visible` 스타일이 있다. 값은 `--focus-ring-*`와 `--color-accent`를 쓴다. 다른 링크는 브라우저 기본 포커스 표시를 쓴다.

## 접근성

- `DefaultLayout`의 첫 요소는 본문(`#main-content`)으로 가는 `SkipLink`다. 홈 프로필에는 태그 목록을 건너뛰는 `SkipLink`가 하나 더 있다. Tab으로 지나기 긴 링크 묶음을 새로 만들면 같은 방식으로 건너뛰기 링크를 단다.
- 글자 없이 아이콘만 있는 링크와 버튼, 라벨이 보이지 않는 입력창에는 `aria-label`로 이름을 준다. 장식용 아이콘에는 `aria-hidden`을 단다.
- 입력 요소를 `display: none`으로 숨기지 않는다. 모양을 따로 그릴 때는 `ThemeToggler`처럼 보이지 않게만 숨겨 포커스와 키보드 조작을 유지한다.
- 포커스가 있는 버튼을 비활성으로 바꾸면 포커스가 `body`로 떨어진다. `CategoryListItem`의 스크롤 버튼처럼 남은 조작 대상으로 포커스를 옮긴다.
- `src/index.css`가 `prefers-reduced-motion: reduce`일 때 모든 전환과 애니메이션을 즉시 끝낸다. JS로 부드러운 스크롤을 쓰면 이 설정에서는 `behavior: 'auto'`로 바꾼다.
- `ul`, `ol`의 직계 자식은 `li`만 두고, `button` 안에는 `p`, `div` 같은 블록 요소 대신 `span`을 쓴다.

## 브레이크포인트

768px 하나만 쓴다. 768px 이하가 모바일이다. CSS 변수는 `@media` 조건에 쓸 수 없으므로 값을 직접 쓴다.

- 모바일: `@media (max-width: 768px)`
- 그 밖: `@media (width > 768px)`. `min-width: 768px`를 쓰면 정확히 768px에서 두 조건이 함께 적용된다.
