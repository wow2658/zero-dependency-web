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
