# 🚀 Zero-Dependency Web Portfolio

본 프로젝트는 외부 프레임워크나 라이브러리(React, Vue, jQuery, Bootstrap, Tailwind, Particles.js 등)를 일절 배제하고 **순수 HTML, CSS, JavaScript(Vanilla JS)** 만을 사용하여 구축한 고성능 인터랙티브 포트폴리오 웹사이트입니다.

## 🔗 배포 및 검증
- **Live Demo:** [https://wow2658.github.io/zero-dependency-web/](https://wow2658.github.io/zero-dependency-web/)
- **배포 확인 체크리스트:** GitHub Pages 배포 시 `index.html` 경로 및 에셋(JS/CSS) 정상 로드 여부 검증 권장
- **주요 브레이크포인트 레이아웃 체크리스트:**
  - `1024px` 이하: 섹션 여백 증가, 콘텐츠 카드 최대 너비 제한 확인
  - `768px` 이하: 1열 Grid 전환, 햄버거 메뉴 노출 확인
- **키보드 내비게이션 기대 동작:** 햄버거 및 라이트박스 열림 시 Tab 키 접근과 ESC 키 닫기 동작 권장

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
## 📜 기술 스택 및 핵심 설계 의도 (15개 평가기준 1:1 증빙)

본 프로젝트는 모던 프론트엔드 아키텍처와 웹 표준을 철저히 준수하여 설계되었습니다. 과제 평가 기준(15개 항목)에 대한 핵심 설계 의도와 **실제 구현 코드(1:1 라인 매칭)**를 아래와 같이 증빙합니다.

- **[평가기준 1] 모바일 퍼스트 반응형 구현**
  - **모바일 퍼스트 (Mobile First):** 스마트폰 기기에서의 사용자 경험(UX)을 최우선으로 고려하여, 모바일 환경에 최적화된 1열 중심의 UI 레이아웃을 기본값(Default)으로 코딩했습니다.
  - **반응형 분기점 (Media Queries):** 기기 해상도가 커졌을 때(태블릿/PC) 레이아웃을 확장하는 `@media (min-width)` 방식을 적용하여 구조적 안정성을 증명했습니다.
  ```css
  /* css/style.css (396번째 줄 부근: 실제 구현 증거) */
  #project-grid {
      grid-template-columns: 1fr; /* 1. 모바일에 맞춰 기본 1열 유지 */
  }
  
  @media (min-width: 769px) {
      #project-grid {
          grid-template-columns: 1fr 1fr; /* 2. 기기가 커지면 2열로 확장 */
      }
  }
  ```

- **[평가기준 2] 다크 모드와 LocalStorage**
  - **상태 유지 및 복원:** 테마 토글 클릭 시 상태 전환과 함께 `localStorage`를 호출하여 브라우저 저장소에 기록합니다. 페이지 새로고침 시 이 값을 읽어와 화면 깜빡임 없이 즉시 복원합니다.
  ```javascript
  // js/main.js (96번째 줄 부근 - 상태 저장)
  document.body.setAttribute('data-theme', 'dark');
  localStorage.setItem('theme', 'dark');
  
  // js/main.js (74번째 줄 부근 - 새로고침 복원)
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') document.body.setAttribute('data-theme', 'dark');
  ```

- **[평가기준 3] 인터랙션 및 애니메이션 (Intersection Observer)**
  - **스크롤 애니메이션:** 스크롤을 내려 요소가 화면에 20% 진입하면 JS가 `.visible` 클래스를 붙여주고, CSS의 `transition`이 작동하여 부드럽게 떠오르며(Fade-in) 나타나게 만듭니다.
  ```javascript
  // js/main.js (1196번째 줄 부근 - 화면 진입 감지기)
  window.scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
      });
  }, { threshold: 0.2 });
  ```

- **[평가기준 4] GitHub API 비동기 통신 제어**
  - **async/await 제어:** 비동기 제어 흐름을 동기식 코드처럼 안정적으로 관리하기 위해 `async/await`을 채택했으며, 다중 API 호출 시 `Promise.all`로 렌더링 속도를 최적화했습니다.
  ```javascript
  // js/main.js (445번째 줄 부근)
  const responses = await Promise.all(repoPromises);
  ```

- **[평가기준 5] 폼 유효성 검사 (Form Validation)**
  - **[1차] HTML5 네이티브 속성:** HTML 태그 자체에 `required`와 `type="email"`을 부여하여 브라우저 기본 검사를 수행합니다.
  - **[2차] JS 커스텀 정규식 검사:** JS에서 폼 전송을 멈추고(`preventDefault`) 정규식으로 한 번 더 강력하게 검사하여 커스텀 에러 문구를 노출합니다.
  ```javascript
  // js/main.js (1062번째 줄 부근)
  contactForm.addEventListener('submit', async (e) => {
      e.preventDefault(); 
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      // 조건 미달 시 커스텀 에러 UI 활성화 로직 수행
  });
  ```

- **[평가기준 6] 파일 분리 및 관심사 분리 (SoC)**
  - **물리적 분리:** 뼈대(HTML), 옷(CSS), 근육(JS)의 역할을 철저히 분리하여, 단일 파일에 모든 코드가 섞이는 스파게티 코드를 원천 차단하고 유지보수성을 높였습니다.
  ```html
  <!-- index.html (관심사가 완벽히 분리된 로드 방식) -->
  <head>
      <!-- 🎨 표현(CSS)은 외부 파일로 100% 위임 -->
      <link rel="stylesheet" href="css/style.css">
  </head>
  <body>
      <!-- 🧱 구조(HTML)만 남김 (인라인 style이나 onclick 속성 절대 없음) -->
      <button id="theme-toggle">테마 변경</button>

      <!-- ⚙️ 동작(JS)은 문서 최하단에서 외부 파일로 로드 -->
      <script src="js/main.js"></script>
  </body>
  ```

- **[평가기준 7] 시맨틱 웹 마크업**
  - **의미론적 구조:** 무의미한 `<div>` 떡칠을 배제하고 `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` 등 시맨틱 태그를 100% 적용하여 SEO와 접근성을 높였습니다.
  ```html
  <main>
      <section id="projects">
          <article class="project-card">...</article>
      </section>
  </main>
  ```

- **[평가기준 8] CSS 변수 (Custom Properties) 활용**
  - **전역 변수 기반 스위칭:** `:root`에 전역 컬러 변수를 선언하고, 라이트모드일 경우 `body[data-theme="light"]` 내부에서 변수값만 재할당하여 유지보수성을 극대화했습니다.
  ```css
  /* css/style.css (2번째 줄, 33번째 줄) */
  :root { --bg-color: #0f172a; --text-main: #f8fafc; }
  body[data-theme="light"] { --bg-color: #f8fafc; --text-main: #0f172a; }
  ```

- **[평가기준 9] addEventListener 사용 목적**
  - **인라인 스크립트 배제:** HTML 내부에 `onclick="함수()"`를 쓰지 않고, 오직 JS 파일 내부에서 `addEventListener`를 통해 주도적으로 이벤트를 연결하여 HTML과 JS의 의존성을 끊고 유지보수성을 극대화합니다.
  ```html
  <!-- ❌ Bad: HTML과 JS가 얽힌 방식 -->
  <button onclick="changeTheme()">테마 변경</button>

  <!-- ✅ Good: HTML은 구조만 담당 -->
  <button id="theme-toggle">테마 변경</button>
  ```
  ```javascript
  // js/main.js (이벤트 주입)
  const themeToggleBtn = document.querySelector('#theme-toggle');
  themeToggleBtn.addEventListener('click', () => { /* 테마 변경 로직 */ });
  ```

- **[평가기준 10] 이벤트 → 상태 변경 → 화면 업데이트 흐름**
  - **단방향 데이터 흐름:** 이벤트가 발생하면 DOM을 직접 훼손하지 않고 상태 객체(`STATE`)만 변경한 뒤, 렌더링 전담 함수를 호출하여 화면을 일관성 있게 업데이트합니다.
  ```javascript
  // js/main.js (필터 버튼 클릭 흐름)
  btn.addEventListener('click', (e) => {
      // 1. [이벤트] 유저 클릭 발생
      
      // 2. [상태 변경] 화면(DOM) 조작 없이 STATE 데이터만 갱신
      STATE.filter = e.target.getAttribute('data-filter');
      STATE.page = 0; 
      
      // 3. [화면 업데이트] 변경된 상태를 기준으로 화면 렌더링 지시
      updateProjCarousel();
  });
  ```

- **[평가기준 11] API 에러 핸들링 (우아한 실패 및 폴백)**
  - **분기 처리 및 재시도:** API 한도 초과 등 네트워크 에러 발생 시 `catch` 블록에서 폴백(Fallback) 모의 데이터를 렌더링하여 앱 크래시를 방지합니다. 404/403 상태를 유저에게 안내합니다.
  ```javascript
  // js/main.js (520번째 줄 부근)
  } catch (error) {
      console.warn("API 호출 실패, 폴백 데이터를 사용합니다.");
      STATE.repos = fallbackRepos;
      updateProjCarousel(); // 앱이 터지지 않고 정상 화면 노출 보장
  }
  ```

- **[평가기준 12] 배열 메서드(map, filter, forEach)의 활용**
  - **불변성 파이프라인:** 원본 배열을 훼손하지 않고 `map`으로 데이터를 UI 규격에 맞게 변환하며 `filter`로 조건에 맞는 요소만 복사 추출합니다.
  ```javascript
  // js/main.js (데이터 가공 로직)
  // 1. map: 원본 훼손 없이 필요한 속성(displayLanguage)을 추가하여 새로운 배열 생성
  STATE.repos = repos.map(repo => {
      let language = repo.language || 'Classified';
      return { ...repo, displayLanguage: language };
  });

  // 2. filter: 현재 상태(STATE.filter)와 일치하는 데이터만 추출
  const filteredRepos = STATE.repos.filter(repo => repo.displayLanguage === STATE.filter);
  ```

- **[평가기준 13] Flexbox vs Grid 선택 로직**
  - **레이아웃 선택 근거:** 1차원 방향 정렬이 필요한 네비게이션은 Flexbox를 선택했고, 반응형 격자 배치가 필요한 프로젝트 목록은 Grid를 채택하여(`grid-template-columns: repeat(auto-fit...)`) 레이아웃 효율을 최적화했습니다.
  ```css
  /* css/style.css (목적에 맞는 레이아웃 도구 선택) */
  /* 1. Flexbox: 1차원(가로) 메뉴 배치 */
  .nav-links {
      display: flex;
      gap: 2rem;
  }
  
  /* 2. Grid: 2차원 카드 격자 배치 (auto-fit으로 미디어쿼리 없이 자동 줄바꿈) */
  #project-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
  }
  ```

- **[평가기준 14] 전역 상태(STATE) 객체와 프론트엔드 렌더링 아키텍처**
  - **상태 객체 분리:** 글로벌 네임스페이스 오염 방지를 위해 흩어진 변수를 `STATE` 객체로 관리합니다.
  - **상태 기반 렌더링 (State-Driven UI):** "화면을 직접 끄고 켜지 않고 오직 데이터만 변경하여 화면을 동기화한다"는 모던 프론트엔드의 철학을 바닐라 JS로 구현했습니다.
    - **jQuery (과거):** 수동으로 UI를 찾아가서 직접 바꿈. (빠르지만 코드가 꼬임)
    - **React (현재):** 데이터만 바꿈. 프레임워크가 화면 전체를 통째로 부수고 다시 그림. (무거움)
    - **SolidJS (미래):** 데이터만 바꿈. 바뀐 UI만 정확히 저격해서 바꿔줌. (빠름)
    ```javascript
    /* 💡 [아키텍처 비교 예시] 버튼을 눌러 포트폴리오 필터를 'C++'로 변경할 때의 내부 동작 차이 */
    
    // ❌ 1. jQuery (명령형 조작 - 과거)
    // 개발자가 직접 "특정 카드들을 찾아서 -> 숨김 처리"하는 모든 과정을 수동으로 지시합니다.
    $('.filter-btn').on('click', function() {
        const selected = $(this).data('filter');
        $('.project-card').hide(); // 모든 카드를 직접 DOM에서 끈 다음
        $(`.project-card[data-lang="${selected}"]`).show(); // 조건에 맞는 DOM만 직접 켭니다.
    });

    // 🔺 2. React (선언형/VirtualDOM - 현재)
    // 개발자는 오직 데이터(상태)만 바꿉니다. 프레임워크가 바뀐 부분을 찾기 위해 컴포넌트 전체를 다시 그립니다.
    function Portfolio() {
        const [filter, setFilter] = useState('all');
        // 버튼 클릭으로 setFilter('C++') 호출 시 ⬇️
        // Portfolio 함수 전체가 처음부터 다시 실행되며(리렌더링) 전체 UI 구조를 비교하는 무거운 계산이 발생합니다.
        return <div>{repos.filter(r => r.lang === filter).map(Card)}</div>;
    }

    // 🚀 3. SolidJS (선언형/Fine-grained 반응성 - 미래)
    // 개발자가 데이터(상태)를 바꾸면, 프레임워크가 해당 데이터를 구독하는 UI "딱 하나"만 저격해서 바꿔줍니다.
    function Portfolio() {
        const [filter, setFilter] = createSignal('all');
        // 버튼 클릭으로 setFilter('C++') 호출 시 ⬇️
        // Portfolio 함수는 다시 실행되지 않습니다! (최초 1회 렌더링 후 영구 유지)
        // 오직 return 문 안에서 filter() 값에 의존하는 저 부분만 스나이퍼처럼 정확히 업데이트됩니다. (압도적 속도)
        return <div>{repos.filter(r => r.lang === filter()).map(Card)}</div>;
    }
    ```
  - **설계 의도:** 외부 라이브러리 없이 위 철학을 모방하여, 데이터(`STATE`) 변경 후 렌더링 함수(`updateProjCarousel`)를 호출하는 아키텍처를 구성했습니다.
  ```javascript
  // js/main.js (761번째 줄 부근)
  filterBtns.forEach(btn => btn.addEventListener('click', (e) => {
      // 1. 상태(데이터)만 바꿉니다. (화면을 직접 숨기지 않음)
      STATE.filter = e.target.getAttribute('data-filter');
      // 2. 바뀐 데이터로 화면을 통째로 다시 그립니다.
      updateProjCarousel(); 
  }));
  ```

- **[평가기준 15] 접근성 및 키보드 내비게이션 고려**
  - **스크린리더 및 키보드 유저 대비:** 메뉴 및 팝업 모달 토글 시 접근성을 고려하며, 특히 `aria-expanded`와 같은 속성 업데이트 및 `ESC` 키를 통한 닫기 상호작용 등 데스크톱/모바일 분기 처리를 구현했습니다.
  ```javascript
  // js/main.js (접근성 및 UX 방어 로직)
  // 1. 상태를 스크린 리더기에도 알려주기 (aria-expanded)
  mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = navLinks.classList.toggle('active');
      mobileMenuBtn.setAttribute('aria-expanded', isExpanded); // 메뉴 열림 상태 전파
  });

  // 2. ESC 키를 누르면 열려있는 모달(라이트박스) 닫기
  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
          closeLightbox(); // 마우스 없이 키보드만으로도 탈출 가능
      }
  });
  ```
