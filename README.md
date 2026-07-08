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

본 프로젝트는 단순한 화면 구현을 넘어, 모던 프론트엔드 아키텍처와 웹 표준을 철저히 준수하여 설계되었습니다. 아래는 과제 평가 기준(15개 항목)에 대한 핵심 설계 의도 및 실제 소스 코드(1:1 라인 넘버) 방어 논리입니다.

### 1. 모바일 퍼스트 레이아웃 & 반응형 구현 (평가기준 1, 15)
- **모바일 퍼스트:** **(css/style.css 1~667번째 줄)** CSS 파일의 최상단부터 중반부까지 작성된 모든 기본 스타일은 모바일(작은 화면)을 기준으로 작성되었습니다. 이는 모바일 기기에서의 초기 렌더링 성능을 극대화(불필요한 CSS 덮어쓰기 방지)하기 위함입니다.
- **반응형 분기점:** **(css/style.css 672번째 줄, 698번째 줄)** @media (max-width: 1024px) 및 @media (max-width: 768px) 등의 미디어 쿼리를 선언하여, 화면 크기가 줄어들 때 데스크톱 뷰에서 모바일 뷰로 유연하게(Fluid) 레이아웃이 변환되도록 설계했습니다.

### 2. 다크 모드와 LocalStorage (평가기준 2)
- **상태 유지:** **(js/main.js 96번째 줄)** 테마 토글 버튼 클릭 시 document.body.setAttribute('data-theme', 'dark')를 통해 즉각적인 스타일 전환을 수행하며, 동시에 localStorage.setItem('theme', 'dark')를 호출하여 브라우저 저장소에 테마 상태를 기록합니다.
- **새로고침 복원:** **(js/main.js 74번째 줄 부근)** 페이지 로드(초기화) 시 즉시 localStorage.getItem('theme')을 확인하여, 사용자가 선택했던 테마를 화면이 깜빡임 없이(DOMContentLoaded 시점) 즉시 복원합니다.

### 3. 인터랙션 및 애니메이션 (평가기준 3)
- **햄버거 메뉴:** **(index.html 65번째 줄 / js/main.js 45번째 줄 부근)** 모바일 뷰에서 햄버거 버튼 클릭 시 classList.toggle('active')를 활용하여 GNB 메뉴의 표시/숨김 상태를 부드럽게 제어합니다.
- **스크롤 애니메이션:** **(js/main.js 1196번째 줄)** 무거운 스크롤 이벤트 대신 브라우저 네이티브 API인 IntersectionObserver를 사용하여 요소가 뷰포트에 진입할 때만 타겟에 isible 클래스를 추가해 페이드인(Fade-in)을 발생시킵니다.
- **Top 버튼:** **(js/main.js 386번째 줄)** window.scrollY > 300일 때 버튼에 isible 클래스를 추가하여 나타나게 하고, **(js/main.js 394번째 줄)** 클릭 시 window.scrollTo({ top: 0, behavior: 'smooth' })로 최상단으로 부드럽게 이동시킵니다.

### 4. GitHub API 연동 및 상태 처리 (평가기준 4, 11)
- **async/await 통신:** 전통적인 콜백이나 단순 .then() 대신, 비동기 제어 흐름을 동기식 코드처럼 읽기 쉽고 안정적으로 관리하기 위해 sync/await을 채택했습니다. 
- **구체적인 코드 흐름 (성공/실패 분기 1:1 라인 매칭):**
  1. **[로딩 상태]** 	ry 블록 진입 직후 **(main.js 433번째 줄)** projectGrid.innerHTML = '<div class="loading-spinner">...'를 통해 로딩 UI를 렌더링합니다.
  2. **[API 호출]** **(main.js 454번째 줄)** const responses = await Promise.all(repoPromises);로 4개의 통신을 병렬 대기합니다.
  3. **[에러 Throw]** **(main.js 457~460번째 줄)** 응답 중 하나라도 에러면(!res.ok), 	hrow new Error()로 하단의 catch 블록으로 흐름을 넘깁니다.
  4. **[성공 분기 - 데이터 할당]** 모두 성공 시 **(main.js 500번째 줄)** STATE.repos = repos.map(...)으로 데이터를 할당하고 **(main.js 523번째 줄)** 렌더링 함수(updateProjCarousel())를 호출합니다.
  5. **[실패 분기 - 우아한 실패 처리]** **(main.js 525번째 줄)** catch 블록에서 에러를 포획하고, **(main.js 563번째 줄)** 미리 준비된 예비 데이터(allbackRepos)를 STATE.repos에 덮어씌운 뒤 **(main.js 582번째 줄)** 렌더링 함수를 호출하여 화면 붕괴를 막습니다.

### 5. 폼 유효성 검사 (평가기준 5)
- **1차 네이티브 검증:** **(index.html 209번째 줄)** HTML5 폼 자체에 
equired 및 <input type="email"> 타입을 지정하여 기본적인 브라우저 유효성 검사를 작동시켰습니다.
- **2차 JS 커스텀 검증:** **(js/main.js 1062번째 줄 부근)** JS의 submit 이벤트 리스너에서 e.preventDefault()로 폼 기본 전송을 막은 뒤, alue.trim()과 정규식을 통해 빈 값 및 이메일 형식을 검사합니다. 에러 시 즉각 폼 하단에 빨간색 경고 문구를 동적으로 삽입합니다.

### 6. HTML, CSS, JavaScript 파일 분리 및 시맨틱 웹 (평가기준 6, 7)
- **관심사 분리 (SoC):** 리포지토리의 파일 구조 자체를 index.html(구조), css/style.css(표현), js/main.js(동작)로 물리적으로 완벽히 분리하여 유지보수성과 팀 협업 가독성을 극대화했습니다.
- **시맨틱 마크업:** **(index.html 15, 69, 305번째 줄 등 전체)** 의미 없는 <div> 남용을 배제하고, <header>, <nav>, <main>, <section>, <footer> 등 시맨틱 태그를 용도에 맞게 100% 적용하여 SEO(검색엔진 최적화)와 접근성(a11y)을 높였습니다.

### 7. CSS 변수 (Custom Properties) 활용 (평가기준 8)
- **변수 선언:** **(css/style.css 2번째 줄)** :root 가상 클래스에 메인 컬러, 여백, 폰트 크기 등을 --bg-color, --text-main과 같이 전역 변수로 선언했습니다.
- **테마 적용:** **(css/style.css 33번째 줄)** 라이트모드 덮어쓰기를 위해 ody[data-theme="light"] 내부에서 해당 변수값만 재할당하는 방식을 사용하여, 일일이 클래스를 변경할 필요 없는 '확장 가능한 테마 아키텍처'를 구축했습니다.

### 8. addEventListener 사용 목적 (평가기준 9)
- **인라인 스크립트 완전 배제:** index.html 문서 내부에 onclick="함수()" 속성을 단 한 번도 사용하지 않았습니다. HTML은 오로지 UI 구조만 담당해야 합니다.
- **JS 주도 바인딩:** **(js/main.js 전체)** 모든 클릭, 스크롤, 서브밋 이벤트는 JS 코드 내에서 .addEventListener를 통해 주도적으로 연결(바인딩)됩니다. 이는 하나의 요소에 다수의 이벤트를 충돌 없이 안전하게 추가하기 위한 모던 웹의 표준 규칙입니다.

### 9. 이벤트 → 상태 변경 → 화면 업데이트 흐름 (평가기준 10)
본 프로젝트는 바닐라 JS로 구현되었음에도, 리액트(React)의 단방향 데이터 흐름 아키텍처를 도입했습니다.
- **이벤트 발생 & 상태 변경:** **(js/main.js 614번째 줄 부근)** 사용자가 필터 버튼을 클릭하면 DOM(화면 요소)을 직접 지우지 않고, 오직 내 머릿속의 상태 데이터만 갱신합니다. (STATE.filter = 'C++')
- **화면 업데이트 지시:** **(js/main.js 617번째 줄)** 상태 변경이 끝나면 무조건 updateProjCarousel()과 같은 렌더링 전담 반장(함수)을 호출하여, 변경된 STATE 데이터를 기반으로 전체 DOM을 새로 그리도록(Re-rendering) 통제합니다.

### 10. 배열 메서드(map, filter, forEach)의 활용 (평가기준 12)
- **map:** **(js/main.js 500번째 줄)** 
epos.map(...)을 사용하여, API에서 온 날것의 데이터 배열을 순회하며 우리 UI 렌더링 규격에 딱 맞는 속성(youtubeId 등)을 주입한 **새로운 배열**을 리턴 받습니다.
- **filter:** **(js/main.js 593번째 줄)** STATE.repos.filter(...)를 사용하여, 전체 프로젝트 배열 중 현재 선택된 언어 카테고리(STATE.filter)와 일치하는 원소만 걸러낸 새로운 배열을 만듭니다.
- **forEach:** **(js/main.js 130번째 줄 부근)** 다수의 비디오 객체 배열을 순회하며 일괄적으로 currentTime을 동기화시키는 등 리턴 값이 필요 없는 단순 반복 연산에 활용했습니다.

### 11. Flexbox vs Grid 선택 로직 (평가기준 13)
- **Flexbox (1차원):** **(css/style.css 154번째 줄 .hamburger)** 네비게이션 아이템이나 햄버거 메뉴의 내부 라인들처럼, 수평이나 수직 **단일 방향**의 정렬과 간격 배분이 필요한 곳에 채택했습니다.
- **CSS Grid (2차원):** **(css/style.css 396번째 줄 #project-grid)** 프로젝트 카드가 전시되는 갤러리 섹션은 가로(Row)와 세로(Column)를 동시에 통제해야 하므로 Grid 레이아웃을 채택했습니다. grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))를 통해 요소 크기에 맞춰 자동으로 줄바꿈되는 완벽한 2차원 반응형(Fluid) 시스템을 구축했습니다.

### 12. 전역 상태(STATE) 객체 중앙 집중화 (평가기준 14)
- **상태 객체 분리:** **(js/main.js 407번째 줄)** const STATE = { repos: [], filter: 'all', page: 0 };
- 흩어져 있던 변수들을 하나의 싱글톤(Singleton) 형태 객체로 강제 묶음 처리했습니다. 이는 글로벌 네임스페이스가 더러워지는(오염) 것을 방지하고, 앱의 핵심 데이터(리스트 원본 데이터, 현재 필터값, 현재 페이지)를 한 곳(Centralized Store)에서 추적 및 관리하기 위한 의도적인 아키텍처(Flux 패턴의 시초 개념) 설계입니다.
