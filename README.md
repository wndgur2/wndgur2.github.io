---
date_started: 2024.05.05
head_count: 1
role: FE
thumbnail: https://github.com/user-attachments/assets/6dccf12f-022c-47b8-9b0f-622027850828
---

### [https://wndgur2.github.io/](https://wndgur2.github.io/)

![Screenshot of the portfolio home page](https://github.com/user-attachments/assets/6dccf12f-022c-47b8-9b0f-622027850828)

**개요**

이 저장소는 개인 블로그/포트폴리오 서비스를 위한 프론트엔드 프로젝트입니다.
게시글, 알고리즘 풀이, 프로젝트 정보를 정적 JSON으로 생성해 로드하고,
카테고리/태그/키워드 검색과 마크다운 렌더링을 제공합니다.

**사용 기술**

- React 18, TypeScript
- Vite 7
- React Router
- Recoil (전역 상태)
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

**디렉토리 구조**

```
.
├── public/
│   ├── meta/              # 생성된 콘텐츠 메타(JSON)
│   ├── images/            # 정적 이미지
│   └── manifest.webmanifest
├── scripts/
│   └── fetch-content.js   # GitHub에서 콘텐츠 수집/가공 스크립트
├── src/
│   ├── api/               # JSON 로딩 API
│   ├── components/        # 공용 컴포넌트
│   ├── contexts/          # 테마 컨텍스트
│   ├── hooks/             # 데이터/검색/정렬 훅
│   ├── pages/             # 라우트별 화면
│   ├── recoil/            # 전역 상태/셀렉터
│   ├── types/             # 타입 정의
│   └── utils/             # 유틸 함수
└── vite.config.ts
```

**작동 방식**

콘텐츠 생성 워크플로우:

- git push를 통해 workflow가 trigger됩니다. (ci-cd)
- `scripts/fetch-content.js`가 GitHub에서 마크다운을 수집하고
  `public/meta/*.json`을 생성합니다.
- 생성된 JSON은 앱 초기 로딩 시 `src/api/post.ts`에서 읽고 Recoil 상태에
  합쳐집니다.
- 홈/검색/상세 페이지는 이 전역 상태를 기반으로 렌더링됩니다.

스크립트 동작 요약:

- BlogDB 저장소의 `posts/` 하위 마크다운을 읽어 `posts.json` 생성
- 지정된 GitHub 계정의 공개 저장소에서 README와 토픽을 분석해 `projects.json`
  생성
- 알고리즘 풀이 저장소를 스캔해 `algorithms.json` 생성
- 기본 스크립트 실행은 현재 알고리즘 생성만 활성화되어 있습니다. (`fetchPosts`,
  `fetchProjects`는 주석 처리됨)
- 기본값은 스크립트 상단의 환경 변수로 제어합니다. (예: `BLOG_DB_REPO`,
  `PROJECTS_OWNER`, `ALGO_REPO`)

실행 스크립트:

- `pnpm dev`: 개발 서버 실행
- `pnpm build`: 타입 체크 후 프로덕션 빌드
- `pnpm preview`: 빌드 결과 미리보기
- `pnpm lint`: ESLint 실행
- `node scripts/fetch-content.js`: 콘텐츠 메타 생성
