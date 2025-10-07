# Lee Junghyeok · Portfolio & Tech Blog

Front-end engineer playground documenting projects, learning logs, and experiments.  
[English](#english) · [한국어](#한국어)

![Screenshot of the portfolio home page](https://github.com/user-attachments/assets/6dccf12f-022c-47b8-9b0f-622027850828)

## English

**Overview**
- React + TypeScript single-page app with Vite delivery and Recoil state (`src/App.tsx:1`).
- Markdown-driven posts and project cards hydrated from static metadata in `public/meta`.
- Responsive UI with light/dark theming, animated navigation, and keyboard-friendly search.

**Live**
- Portfolio: <https://wndgur2.github.io/>
- GitHub: <https://github.com/wndgur2>
- Baekjoon: <https://www.acmicpc.net/user/wndgur2>
- SW Expert Academy: <https://swexpertacademy.com/main/userpage/home/userHome.do?userId=AY9bT9Ma97cDFAS1>

**Highlights**
- Routing shell mounts Layout, Home, Search, and Post Detail routes while hydrating once from JSON (`src/App.tsx:1`, `src/api/post.ts:9`).
- Post metadata is inserted with a binary-search helper to keep timelines sorted without re-render storms (`src/utils/sortedInsert.ts:1`).
- Project cards surface roles, timelines, and tags with lazy image skeletons for visual polish (`src/components/Post/ProjectListItem.tsx:1`).
- Search aggregates by keyword, related tags, and toggleable sort order for quick filtering (`src/pages/Search/SearchResult.tsx:1`).
- Theme state persists to `localStorage`, updates favicons, and flows through context-aware layout styling (`src/contexts/ThemeProvider.tsx:1`, `src/pages/Layouts/Layout.tsx:1`).

**Content Pipeline**
- `scripts/fetch-content.js` pulls Markdown from the `wndgur2/BlogDB` repository, parses front matter with gray-matter, and emits `posts.json`/`projects.json` (`scripts/fetch-content.js:1`).
- GitHub READMEs tagged with `ljh` topics are transformed into project previews, including thumbnail fallbacks (`public/meta/projects.json`).
- Client fetches metadata at runtime and merges posts/projects into a single feed (`src/api/post.ts:9`).

**Getting Started**
```bash
pnpm install        # install dependencies
pnpm dev            # start Vite dev server on http://localhost:5173
pnpm build          # type-check (tsc) + generate static assets in dist/
pnpm preview        # serve the production build locally
```

**Metadata Refresh (optional)**
```bash
GH_PAT=<token> node scripts/fetch-content.js
```
- Requires a GitHub Personal Access Token with `repo` scope to avoid rate limits.
- Outputs fresh content under `public/meta` (and optional `public/posts` if the write step is re-enabled).

**Directory Hints**
- `src/pages/Home` – project and post feed composition.
- `src/pages/Search` – keyword search, tag aggregation, and sort controls.
- `src/pages/PostDetail` – Markdown rendering pipeline for detail pages.
- `src/hooks` – reusable data helpers for categories, sorting, tag inference, and theming.
- `public/meta` – generated post/project metadata consumed at runtime.

**Roadmap**
- Expand scroll-based storytelling components for long-form case studies.
- Add data visualizations that complement learning notes.
- Publish bilingual posts (Korean ↔ English) to reach a broader audience.

---

## 한국어

**개요**
- React·TypeScript 기반의 Vite SPA와 Recoil 전역 상태 관리 (`src/App.tsx:1`).
- `public/meta`의 정적 메타데이터를 이용해 마크다운 글과 프로젝트를 불러옵니다.
- 반응형 UI, 라이트/다크 테마, 애니메이션 헤더, 키보드 친화적 검색을 제공합니다.

**서비스**
- 포트폴리오: <https://wndgur2.github.io/>
- GitHub: <https://github.com/wndgur2>
- 백준: <https://www.acmicpc.net/user/wndgur2>
- SW Expert Academy: <https://swexpertacademy.com/main/userpage/home/userHome.do?userId=AY9bT9Ma97cDFAS1>

**주요 기능**
- 라우팅 셸이 Layout·Home·Search·PostDetail 화면을 구성하고 JSON을 한 번만 로드해 전역 상태에 주입합니다 (`src/App.tsx:1`, `src/api/post.ts:9`).
- 이진 탐색 기반 정렬 유틸로 최신순 타임라인을 유지하면서 리렌더를 최소화합니다 (`src/utils/sortedInsert.ts:1`).
- 프로젝트 카드는 역할·기간·태그와 함께 썸네일 스켈레톤을 보여주어 읽기 흐름을 돕습니다 (`src/components/Post/ProjectListItem.tsx:1`).
- 검색 페이지는 키워드, 연관 태그, 최신/과거 순 토글을 제공하여 원하는 글을 빠르게 찾게 합니다 (`src/pages/Search/SearchResult.tsx:1`).
- 테마 상태를 `localStorage`에 저장하고 파비콘까지 교체하여 사용자 경험을 유지합니다 (`src/contexts/ThemeProvider.tsx:1`, `src/pages/Layouts/Layout.tsx:1`).

**콘텐츠 파이프라인**
- `scripts/fetch-content.js`가 `wndgur2/BlogDB` 리포지터리의 마크다운을 가져와 front matter를 파싱하고 `posts.json`과 `projects.json`을 생성합니다 (`scripts/fetch-content.js:1`).
- `ljh` 토픽이 포함된 GitHub README를 프로젝트 카드로 변환하며 썸네일 기본값을 지정합니다 (`public/meta/projects.json`).
- 클라이언트는 런타임에 메타데이터를 가져와 글과 프로젝트를 하나의 피드로 합칩니다 (`src/api/post.ts:9`).

**개발 방법**
```bash
pnpm install        # 의존성 설치
pnpm dev            # 로컬 개발 서버 (http://localhost:5173)
pnpm build          # 타입 검사 + 프로덕션 빌드
pnpm preview        # 빌드 결과 미리보기
```

**메타데이터 업데이트 (선택)**
```bash
GH_PAT=<token> node scripts/fetch-content.js
```
- GitHub Personal Access Token(`repo` 권한)이 있으면 속도 제한을 피할 수 있습니다.
- 결과는 `public/meta` (필요 시 `public/posts`)에 저장됩니다.

**구조 안내**
- `src/pages/Home` – 프로젝트와 포스트 목록 레이아웃.
- `src/pages/Search` – 검색, 태그 집계, 정렬 토글.
- `src/pages/PostDetail` – 마크다운 렌더링 파이프라인.
- `src/hooks` – 카테고리, 정렬, 태그 추론, 테마 훅 모음.
- `public/meta` – 런타임에서 소비되는 정적 메타데이터.

**로드맵**
- 스크롤 인터랙션을 강화해 스토리텔링형 포스트를 확장합니다.
- 학습 노트와 맞는 데이터 시각화를 추가합니다.
- 한국어/영어 병행 게시로 더 넓은 독자층을 확보합니다.
