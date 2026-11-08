---
title: 이중혁 블로그
date_started: 2024.05.05
head_count: 1
role: FE
---

![Screenshot of the portfolio home page](https://github.com/user-attachments/assets/6dccf12f-022c-47b8-9b0f-622027850828)

### [https://wndgur2.github.io/](https://wndgur2.github.io/)

**개요**

이 저장소는 개인 블로그/포트폴리오 서비스를 위한 프론트엔드 프로젝트입니다.
게시글, 알고리즘 풀이, 프로젝트 정보를 정적 JSON으로 생성해 로드하고,
카테고리/태그/키워드 검색과 마크다운 렌더링을 제공합니다.

**사용 기술**

- React 19, TypeScript
- Vite 7
- React Router
- Zustand (정렬 상태 저장)
- TanStack Query (서버/메타 데이터 캐시)
- markdown-to-jsx, html-react-parser (마크다운/HTML 렌더)
- highlight.js (코드 하이라이팅)
- Octokit, gray-matter (콘텐츠 수집/파싱 스크립트)

**기능**

- 홈에서 카테고리별(Projects/Studies/Algorithms) 목록 노출 및 가로 스크롤 탐색
- 게시글 상세 페이지에서 마크다운 렌더링 및 코드 하이라이팅
- 검색 기능: 키워드, `#태그`, `@카테고리` 기반 검색
- 검색 결과 정렬(최신순/오래된순) 토글
- 태그 목록/관련 태그 표시
- 다크/라이트 테마 전환 및 테마별 파비콘/하이라이트 테마 적용
- 게시글 이전/다음 이동 및 404 처리
- 빌드 시 게시글/프로젝트별 정적 HTML, `sitemap.xml`, `robots.txt` 생성 (SEO)
- 지식 그래프 페이지(`/graph`): Claude가 글마다 추출한 개념/관계를 force-directed 그래프로 표시

**디렉토리 구조**

```
.
├── public/
│   ├── meta/              # 생성된 콘텐츠 메타(JSON)
│   ├── images/            # 정적 이미지
│   └── manifest.webmanifest
├── scraper/
│   └── scripts/
│       ├── fetch-content.js         # GitHub에서 콘텐츠 수집/가공 스크립트
│       ├── generate-static-pages.js # 빌드 결과물에 SEO용 정적 페이지 생성
│       └── generate-knowledge-graph.js # Claude로 지식 그래프 추출 (pnpm graph)
├── src/
│   ├── api/               # JSON 로딩 API (TanStack Query)
│   ├── components/        # UI 컴포넌트
│   ├── contexts/          # 테마 컨텍스트
│   ├── features/          # 도메인별 selector / search hook
│   ├── hooks/             # 데이터/검색/정렬 훅
│   ├── pages/             # 라우트별 화면
│   ├── store/             # 전역 UI 상태 (zustand)
│   ├── types/             # 타입 정의
│   └── utils/             # 유틸 함수
└── vite.config.ts
```

### 콘텐츠 생성 워크플로우 (GitHub API 중심)

```markdown
git push  
↓  
GitHub Actions (CI/CD)  
↓  
scraper/scripts/fetch-content.js 실행  
↓  
[ GitHub API 호출 ]  
↓  
├─ BlogDB repo → posts/ 마크다운 조회  
├─ Public repos → README / topics 조회  
└─ Algorithm repo → 코드/파일 조회  
↓  
데이터 가공 (파싱 & 메타데이터 추출)  
↓  
JSON 생성 (posts.json / projects.json / algorithms.json)  
↓  
public/meta/ 저장  
↓  
src/api/post.ts 로드  
↓  
클라이언트 상태(zustand) + URL state 결합  
↓  
홈 / 검색 / 상세 페이지 렌더링
```

### GitHub API 기반 데이터 수집

```markdown
# GitHub API 기반 데이터 수집

scraper/scripts/fetch-content.js  
 ↓  
GitHub API 요청  
 ↓  
 ├─ GET /repos/{owner}/BlogDB/contents/posts  
 │ ↓  
 │ 마크다운 파일 목록  
 │ ↓  
 │ 파일 내용 fetch (raw)  
 │ ↓  
 │ posts.json 생성  
 │  
 ├─ GET /users/{owner}/repos  
 │ ↓  
 │ repo 리스트  
 │ ↓  
 │ README.md + topics 조회  
 │ ↓  
 │ projects.json 생성  
 │  
 └─ GET /repos/{owner}/AlgorithmRepo/contents  
 ↓  
 알고리즘 파일 스캔  
 ↓  
 문제/언어/경로 파싱  
 ↓  
 algorithms.json 생성
```

실행 스크립트:

- `pnpm dev`: 개발 서버 실행
- `pnpm build`: 타입 체크 후 프로덕션 빌드, 정적 페이지 생성 (`public/meta`가 있어야 생성됨)
- `pnpm graph`: 바뀐 글만 Claude로 개념/관계를 추출하고 중복 개념을 병합해 `scraper/cache/knowledge-graph.json`에 저장 (`--force` 전체 재추출, `--remerge` 병합만 다시, `ANTHROPIC_API_KEY` 필요)

### 지식 그래프

- `pnpm graph`가 글(projects + posts, 알고리즘 풀이 제외)마다 Claude를 호출해 요약·개념·관계를 추출하고, 결과를 본문 해시와 함께 `scraper/cache/knowledge-graph.json`에 캐시합니다.
- 추출이 끝나면 전체 개념 목록을 Claude에 한 번 더 보내 같은 개념의 다른 이름(표기·한영·약어)을 묶고, 별칭표(`merge.aliases`)를 캐시에 저장합니다. 개념 목록이 바뀔 때만 다시 병합합니다.
- 캐시 파일을 커밋하면 CI의 `fetch-content.js`가 API 호출 없이 캐시로 `public/meta/knowledge-graph.json`을 만듭니다. 캐시가 없거나 본문이 바뀐 글은 태그를 개념으로 대신 사용합니다.
- 환경변수: `KG_MODEL`(기본 `claude-opus-5-5`), `KG_EFFORT`(기본 `medium`), `KG_CONCURRENCY`(기본 4)
- `pnpm preview`: 빌드 결과 미리보기
- `pnpm lint`: ESLint 실행
- `pnpm exec node scraper/scripts/fetch-content.js`: 콘텐츠 메타 생성

### PR 프리뷰

운영 배포는 GitHub Pages가 담당하고, Vercel은 PR 프리뷰 전용으로 사용합니다 (`vercel.json`에서 `main` 배포 비활성화).

- Vercel 프로젝트 환경 변수에 `GH_PAT`를 등록해야 합니다.
- 프리뷰는 없는 경로도 앱 화면을 200으로 응답하므로, GitHub Pages의 404 동작은 검증할 수 없습니다.
