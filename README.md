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

본 프로젝트는 모던 프론트엔드 아키텍처와 웹 표준을 철저히 준수하여 설계되었습니다. 과제 평가 기준(15개 항목)에 대한 핵심 설계 의도와 **실제 구현 코드(1:1 라인 매칭)**를 아래와 같이 증빙합니다.

- **1. 모바일 퍼스트 레이아웃 & 반응형 구현 (평가기준 1, 15)**
  - **모바일 퍼스트:** CSS 파일의 상단에 작성된 모든 기본 스타일은 모바일(작은 화면)을 기준으로 작성하여 초기 렌더링 성능을 극대화했습니다.
  - **반응형 분기점:** 미디어 쿼리를 선언하여, 화면 크기가 커질 때 데스크톱 뷰로 유연하게(Fluid) 레이아웃이 변환되도록 설계했습니다.
  ```css
  /* css/style.css (1~667번째 줄: 모바일 기본 스타일) */
  body { font-family: 'Inter', sans-serif; ... }
  
  /* css/style.css (672번째, 698번째 줄: 반응형 분기점) */
  @media (max-width: 1024px) { ... }
  @media (max-width: 768px) { ... }
  ```

- **2. 다크 모드와 LocalStorage (평가기준 2)**
  - **상태 유지 및 복원:** 테마 토글 버튼 클릭 시 즉각적인 스타일 전환을 수행하며, 동시에 `localStorage`를 호출하여 브라우저 저장소에 테마 상태를 기록합니다. 페이지 새로고침 시 이 값을 읽어와 화면 깜빡임 없이 즉시 복원합니다.
  ```javascript
  // js/main.js (96번째 줄 부근 - 상태 저장)
  document.body.setAttribute('data-theme', 'dark');
  localStorage.setItem('theme', 'dark');
  
  // js/main.js (74번째 줄 부근 - 새로고침 복원)
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') document.body.setAttribute('data-theme', 'dark');
  ```

- **3. 인터랙션 및 애니메이션 (평가기준 3)**
  - **스크롤 애니메이션:** 무거운 스크롤 이벤트 대신 브라우저 네이티브 API인 `IntersectionObserver`를 사용하여 요소가 뷰포트에 20% 진입할 때만 페이드인(Fade-in)을 발생시킵니다.
  ```javascript
  // js/main.js (1196번째 줄 부근)
  window.scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
      });
  }, { threshold: 0.2 });
  ```

- **4. GitHub API 연동 및 상태 처리 (평가기준 4, 11)**
  - **async/await 통신 및 우아한 실패:** 비동기 제어 흐름을 동기식 코드처럼 안정적으로 관리하기 위해 `async/await`을 채택했으며, 에러 발생 시 `catch` 블록으로 이동하여 폴백(Fallback) 데이터를 뿌려줍니다.
  ```javascript
  // js/main.js (433~582번째 줄: 5단계 분기 흐름)
  try {
      // 1. [로딩 상태]
      projectGrid.innerHTML = '<div class="loading-spinner">...</div>';
      // 2. [API 호출]
      const responses = await Promise.all(repoPromises);
      // 3. [에러 Throw]
      const failedResponse = responses.find(res => !res.ok);
      if (failedResponse) throw new Error(`통신 에러 발생`);
      // 4. [성공 분기]
      STATE.repos = repos.map(...); 
      updateProjCarousel(); // 정상 렌더링
  } catch (error) {
      // 5. [실패 분기 - 우아한 실패 처리]
      STATE.repos = fallbackRepos.map(...);
      updateProjCarousel(); // 더미 데이터 렌더링
  }
  ```

- **5. 폼 유효성 검사 (평가기준 5)**
  - **1차 네이티브 및 2차 커스텀 검증:** HTML5 폼 자체에 속성을 지정하여 기본적인 브라우저 검증을 거친 뒤, JS의 이벤트 리스너에서 전송을 멈추고 빈 값 및 이메일 형식을 2차 검사합니다.
  ```javascript
  // js/main.js (1062번째 줄 부근)
  contactForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // 기본 폼 전송 차단
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(emailInput.value)) { /* 에러 문구 노출 */ }
  });
  ```

- **6. HTML, CSS, JavaScript 파일 분리 및 시맨틱 웹 (평가기준 6, 7)**
  - **관심사 분리(SoC) 및 시맨틱 마크업:** 구조(HTML), 표현(CSS), 동작(JS)을 물리적으로 완벽히 분리했습니다. 무의미한 `<div>`를 배제하고 시맨틱 태그를 100% 적용하여 SEO와 접근성을 높였습니다.
  ```html
  <!-- index.html (문서 전체 구조) -->
  <header>...</header>
  <nav>...</nav>
  <main>
      <section id="projects">
          <article class="project-card">...</article>
      </section>
  </main>
  <footer>...</footer>
  ```

- **7. CSS 변수 (Custom Properties) 활용 (평가기준 8)**
  - **전역 변수 및 테마 스위칭:** `:root`에 전역 컬러 변수를 선언하고, 라이트모드일 경우 `body[data-theme="light"]` 내부에서 변수값만 재할당하여 유지보수성을 극대화했습니다.
  ```css
  /* css/style.css (2번째 줄, 33번째 줄) */
  :root {
      --bg-color: #0f172a;
      --text-main: #f8fafc;
  }
  body[data-theme="light"] {
      --bg-color: #f8fafc; /* 라이트모드 덮어쓰기 */
      --text-main: #0f172a;
  }
  ```

- **8. addEventListener 사용 목적 (평가기준 9)**
  - **인라인 스크립트 배제:** HTML 내부에 `onclick="함수()"`를 쓰지 않고, 오직 JS 코드 내에서 `addEventListener`를 통해 주도적으로 이벤트를 연결합니다. 이는 충돌을 방지하고 디버깅을 용이하게 합니다.
  ```javascript
  // js/main.js (전체)
  const themeToggleBtn = document.querySelector('#theme-toggle');
  themeToggleBtn.addEventListener('click', () => { ... });
  ```

- **9. 이벤트 → 상태 변경 → 화면 업데이트 흐름 (평가기준 10)**
  - **단방향 데이터 흐름:** 이벤트가 발생하면 DOM을 훼손하지 않고 상태(STATE)만 변경한 뒤, 렌더링 전담 함수(`updateProjCarousel`)를 호출하여 화면을 일관성 있게 업데이트합니다.
  ```javascript
  // js/main.js (614번째 줄 부근)
  filterBtns.forEach(btn => btn.addEventListener('click', (e) => {
      // 1. 상태 데이터만 변경
      STATE.filter = e.target.getAttribute('data-filter');
      STATE.page = 0; 
      
      // 2. 화면 전체 새로 그리기 명령
      updateProjCarousel();
  }));
  ```

- **10. 배열 메서드(map, filter, forEach)의 활용 (평가기준 12)**
  - **데이터 가공 파이프라인:** 원본 배열을 훼손하지 않고, `map`으로 데이터를 UI 규격에 맞게 변환하며 `filter`로 조건에 맞는 요소만 추출합니다.
  ```javascript
  // js/main.js (500번째 줄 - map 데이터 주입)
  STATE.repos = repos.map(repo => ({
      ...repo,
      youtubeId: YOUTUBE_LINKS[repo.name]
  }));
  
  // js/main.js (593번째 줄 - filter 데이터 필터링)
  filteredRepos = STATE.repos.filter(repo => repo.displayLanguage === STATE.filter);
  ```

- **11. Flexbox vs Grid 선택 로직 (평가기준 13)**
  - **1차원 vs 2차원 레이아웃:** 단방향 정렬이 필요한 햄버거 메뉴나 네비게이션은 `Flexbox`를, 행과 열의 2차원 통제가 필요한 갤러리는 `Grid`를 채택했습니다.
  ```css
  /* css/style.css (154번째 줄 - Flexbox 1차원) */
  .hamburger { display: flex; flex-direction: column; }
  
  /* css/style.css (396번째 줄 - Grid 2차원 반응형 자동 줄바꿈) */
  #project-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
  ```

- **12. 전역 상태(STATE) 객체 중앙 집중화 (평가기준 14)**
  - **상태 객체 분리:** 글로벌 네임스페이스 오염을 방지하고 예측 가능성을 높이기 위해 흩어진 변수를 묶어 싱글톤(Singleton) 객체로 관리합니다.
  ```javascript
  // js/main.js (407번째 줄)
  const STATE = {
      repos: [],    // 원본 데이터
      filter: 'all', // 현재 선택된 필터
      page: 0       // 현재 페이지 번호
  };
  ```
