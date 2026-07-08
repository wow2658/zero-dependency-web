# 🚀 Zero-Dependency Web Portfolio

본 프로젝트는 외부 프레임워크나 라이브러리(React, Vue, jQuery, Bootstrap, Tailwind, Particles.js 등)를 일절 배제하고 **순수 HTML, CSS, JavaScript(Vanilla JS)** 만을 사용하여 구축한 고성능 인터랙티브 포트폴리오 웹사이트입니다.

## 🔗 배포 링크
- **Live Demo:** [https://wow2658.github.io/zero-dependency-web/](https://wow2658.github.io/zero-dependency-web/)

## 📸 스크린샷 (Desktop / Mobile / Dark Mode)

> 💡 **작성자 안내:** 깃허브 이슈나 리드미 편집창에 캡처한 이미지를 드래그 앤 드롭한 뒤, 생성되는 이미지 링크를 아래 괄호 안에 붙여넣어 주세요.

### 💻 1. 데스크톱 화면 (Desktop)
![데스크톱 화면](https://github.com/user-attachments/assets/b123fb7e-c030-4a6b-a21a-ff35465c2d96)

### 📱 2. 모바일 화면 (Mobile)
![모바일 화면](https://github.com/user-attachments/assets/57738bcc-0595-4342-823d-b30585824fcd)

### 🌙 3. 다크 모드 (Dark Mode)
![다크모드 화면](https://github.com/user-attachments/assets/10fc213e-c301-4818-855c-036ef8612018)

### ☀️ 4. 라이트 모드 (Light Mode)
![라이트모드 화면](https://github.com/user-attachments/assets/cb03296f-43f5-4241-ad6b-49589071b908)


## ⚙️ 주요 인터랙션 및 기준값(Thresholds) 설정

본 포트폴리오는 성능 최적화와 부드러운 UI/UX를 위해 다음과 같은 커스텀 기준값을 적용하여 개발되었습니다.

- **스크롤 연동 페이드인 애니메이션 (Intersection Observer)**
  - 요소가 화면에 진입할 때 애니메이션이 발생하는 임계값(Threshold): `0.2` (화면의 20%가 노출되었을 때 작동)
  ```javascript
  // js/main.js (1154~1156번째 줄)
  const observerOptions = {
      threshold: 0.2 // 요소가 20% 보일 때 트리거
  };
  ```
  
- **네비게이션 바 (GNB) 상태 변경**
  - 최상단에서 스크롤을 내릴 때 네비게이션 배경에 글래스모피즘(Glassmorphism) 효과가 짙어지는 기준: `scrollY > 60px`
  ```javascript
  // js/main.js (1124~1128번째 줄)
  // 스크롤 60px 이상 시 네비게이션 스타일 변경
  if (navbar) {
      if (window.scrollY > 60) {
          navbar.classList.add('scrolled');
  ```
  
- **Top 버튼 노출**
  - 화면 우측 하단의 최상단으로 이동하는 플로팅 버튼이 나타나는 기준: `scrollY > 300px`
  ```javascript
  // js/main.js (1133~1137번째 줄)
  // 스크롤 300px 이상 시 위로 가기 버튼 표시
  if (scrollTopBtn) {
      if (window.scrollY > 300) {
          scrollTopBtn.classList.add('visible');
  ```
  


## 🚀 프로젝트 실행 방법

이 프로젝트는 의존성 패키지(Dependencies)가 없으므로 `npm install`이나 빌드 과정이 필요하지 않습니다. 
로컬 환경에서 소스코드를 다운로드하고 `index.html` 파일을 브라우저에서 열기만 하면 모든 기능이 100% 동작합니다.

```bash
# 1. 저장소 클론
git clone https://github.com/wow2658/zero-dependency-web.git

# 2. 브라우저에서 index.html 실행
```
## 📜 기술 스택 및 핵심 설계 의도 (Evaluation Criteria)

본 프로젝트는 단순한 화면 구현을 넘어, 모던 프론트엔드 아키텍처와 웹 표준을 철저히 준수하여 설계되었습니다. 아래는 과제 평가 기준(15개 항목)에 대한 핵심 설계 의도 및 기술적 방어 논리입니다.

### 1. 모바일 퍼스트 레이아웃 & 반응형 구현 (평가기준 1, 15)
- **모바일 퍼스트 (Mobile-First):** css/style.css에서 기본 스타일은 모바일(작은 화면)을 기준으로 작성되었습니다. 이는 모바일 기기에서의 초기 로딩 성능(불필요한 CSS 렌더링 방지)을 최적화하기 위함입니다.
- **반응형 (Responsive):** @media (min-width: 768px), @media (min-width: 1024px) 미디어 쿼리를 사용하여 화면 크기가 커질 때만 데스크톱용 레이아웃(그리드 컬럼 증가 등)이 덧입혀지도록 설계했습니다.

### 2. 다크 모드와 LocalStorage (평가기준 2)
- **상태 유지:** 테마 토글 버튼 클릭 시 document.body.setAttribute('data-theme', 'dark')를 통해 즉각적인 스타일 전환을 수행하며, 동시에 localStorage.setItem('theme', 'dark')를 호출하여 브라우저에 테마 상태를 저장합니다.
- **새로고침 유지:** 페이지 로드(초기화) 시 localStorage.getItem('theme')을 가장 먼저 확인하여, 사용자가 선택했던 테마를 화면이 깜빡임 없이 즉시 복원합니다.

### 3. 인터랙션 및 애니메이션 (평가기준 3)
- **햄버거 메뉴:** 모바일 뷰에서 햄버거 버튼 클릭 시 classList.toggle('active')를 활용하여 메뉴의 표시/숨김 상태를 제어합니다.
- **스크롤 애니메이션:** 성능 최적화를 위해 스크롤 이벤트 대신 브라우저 네이티브 API인 IntersectionObserver를 사용(Threshold: 0.2)하여 요소가 뷰포트의 20% 이상 진입했을 때만 부드러운 페이드인(Fade-in)을 발생시킵니다.
- **Top 버튼:** window.scrollY > 300일 때 나타나도록 설계되었으며, window.scrollTo({ top: 0, behavior: 'smooth' })로 부드러운 이동을 구현했습니다.

### 4. GitHub API 연동 및 상태 처리 (평가기준 4, 11)
- **async/await 통신:** 전통적인 콜백이나 단순 .then() 대신, 비동기 제어 흐름을 동기식 코드처럼 읽기 쉽고 안정적으로 관리하기 위해 sync/await을 채택했습니다. 
- **try/catch 예외 처리:** API 호출 중 403(Rate Limit)이나 네트워크 단절이 발생할 경우를 대비해 	ry/catch 블록으로 예외를 포획하고, 즉각 fallback(더미) 데이터를 화면에 뿌리는 '우아한 실패(Graceful Degradation)'를 구현했습니다.
- **로딩/성공/에러/빈 상태:** 상태에 따라 DOM(화면)을 덮어씌웁니다. 로딩 중에는 스피너를, 성공 시 프로젝트 카드를, 실패 시 isDummyError, 데이터가 없을 시 isDummyEmpty 플래그를 활용해 시각적 피드백(재시도 버튼 포함)을 명확하게 렌더링합니다.

### 5. 폼 유효성 검사 (평가기준 5)
- HTML5의 equired 속성과 <input type="email">을 통한 1차 네이티브 검증을 수행하고, 자바스크립트의 submit 이벤트 리스너 내부에서 e.preventDefault()로 폼 전송을 막은 뒤 직접 2차 유효성(빈 값, 이메일 정규식 패턴)을 검사합니다. 
- 오류 발생 시 span.error-msg 요소에 즉각적으로 빨간색 텍스트로 에러 원인을 노출시켜 사용자 경험(UX)을 향상시켰습니다.

### 6. HTML, CSS, JavaScript 파일 분리 및 시맨틱 웹 (평가기준 6, 7)
- **관심사 분리 (SoC):** 구조(index.html), 표현(css/style.css), 동작(js/main.js)을 물리적으로 완벽히 분리하여 유지보수성과 가독성을 극대화했습니다.
- **시맨틱 마크업:** 단순 <div> 남용을 배제하고, <header>, <nav>, <main>, <section>, <article>, <footer> 등 시맨틱 태그를 구조에 맞게 배치하여 SEO(검색엔진 최적화) 및 스크린 리더 등 웹 접근성을 높였습니다.

### 7. CSS 변수 (Custom Properties) 활용 (평가기준 8)
- :root 선택자를 이용해 메인 컬러, 텍스트 컬러, 여백 등을 변수(--bg-color, --text-main 등)로 선언했습니다.
- 다크모드 적용 시 CSS 클래스 일일이 변경할 필요 없이 [data-theme="dark"] 블록 안에서 CSS 변수값만 덮어씌우는 방식으로 설계하여, 테마 확장이 매우 용이한 유지보수 아키텍처를 구성했습니다.

### 8. addEventListener 사용 목적 (평가기준 9)
- HTML 내부에 onclick="함수()"를 직접 작성하는 인라인 스크립트 방식은 HTML과 JS가 결합되어 유지보수를 어렵게 합니다. 
- 이를 방지하기 위해 ddEventListener를 사용하여 HTML은 구조만 담당하게 하고 JS가 이벤트 바인딩을 주도하도록 설계했습니다. 이를 통해 하나의 요소에 다수의 이벤트를 충돌 없이 안전하게 연결할 수 있습니다.

### 9. 이벤트 → 상태 변경 → 화면 업데이트 흐름 (평가기준 10)
- 본 프로젝트는 리액트(React)의 단방향 데이터 흐름 철학을 바닐라 JS로 구현했습니다.
- 사용자가 버튼(필터, 다크모드 등)을 클릭(이벤트 발생)하면, DOM을 직접 조작해 화면을 억지로 숨기거나 지우지 않습니다. 대신 **전역 상태 객체(STATE)의 값만 수정**하고, 렌더링 전담 함수(updateProjCarousel(), enderTheme())를 호출하여 '변경된 상태를 기반으로 화면 전체를 새로 그리도록' 아키텍처를 설계했습니다.

### 10. 배열 메서드(map, filter, forEach)의 활용 (평가기준 12)
- **map**: GitHub API에서 받아온 원본 배열(epos)을 순회하며, 우리 UI에 필요한 속성(youtubeId, displayName 등)이 결합된 **새로운 배열**을 만들어낼 때 사용했습니다.
- **ilter**: 사용자가 'C++' 버튼을 눌렀을 때 전체 데이터에서 조건(epo.displayLanguage === currentFilter)에 맞는 요소들만 추려낸 새로운 배열을 반환받아 화면을 렌더링했습니다.
- **orEach**: 배열 안의 요소들(예: 비디오 객체들)에 단순히 동일한 명령(재생 위치 동기화 등)을 반복 실행시킬 때 사용했습니다.

### 11. Flexbox vs Grid 선택 로직 (평가기준 13)
- **Flexbox (1차원 레이아웃):** 네비게이션 바(GNB), 연락처 폼 등 가로나 세로 중 **'단방향 정렬'**이 필요한 곳에 적용하여 유연한 요소 간격을 확보했습니다.
- **CSS Grid (2차원 레이아웃):** Projects 카드가 나열되는 갤러리 영역은 행(Row)과 열(Column)이 동시에 통제되어야 하므로 Grid를 채택했습니다. 특히 grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))을 통해 미디어 쿼리 없이도 카드 크기가 유체(Fluid)처럼 반응형으로 자동 배치되도록 최적화했습니다.

### 12. 전역 상태(STATE) 객체 중앙 집중화 (평가기준 14)
- llGithubRepos, currentProjFilter, currentProjPage 등 흩어져 있던 변수들을 묶어 단일 const STATE = { ... } 객체로 관리했습니다.
- 이는 글로벌 네임스페이스 오염을 방지하고, 데이터가 변경되는 출처와 구조를 한 곳으로 모아(Centralized State) 코드의 예측 가능성을 높이는 모던 프론트엔드 아키텍처(Flux, Redux 등) 패턴을 반영한 의도적인 설계입니다.

