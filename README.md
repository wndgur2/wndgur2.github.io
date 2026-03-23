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

### 콘텐츠 생성 워크플로우 (GitHub API 중심)

```markdown
git push  
↓  
GitHub Actions (CI/CD)  
↓  
scripts/fetch-content.js 실행  
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
Recoil 전역 상태 병합  
↓  
홈 / 검색 / 상세 페이지 렌더링
```

### GitHub API 기반 데이터 수집

```markdown
# GitHub API 기반 데이터 수집

fetch-content.js  
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
- `pnpm build`: 타입 체크 후 프로덕션 빌드
- `pnpm preview`: 빌드 결과 미리보기
- `pnpm lint`: ESLint 실행
- `node scripts/fetch-content.js`: 콘텐츠 메타 생성
