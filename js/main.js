/**
 * 🌐 프론트엔드 포트폴리오 메인 스크립트
 * 
 * - 4단계: DOM 제어 및 이벤트 리스너 연결
 * - 5단계: STATE 객체 설계 및 다크모드 로직
 * - 6단계: 비동기 통신 (GitHub API) 
 * - 7단계: 폼 유효성 검사 및 필터링
 * 
 * 위 기능들이 앞으로 이 파일에 단계적으로 채워질 예정이다.
 */

console.log("포트폴리오 스크립트 로드 완료...");

// ----------------------------------------------------
// 0. 전역 상태(STATE) 관리 객체
// ----------------------------------------------------
// 💡 JS 객체 리터럴(Object Literal)과 const의 진짜 의미 (CS 면접 단골 질문!)
// 
// 1. 객체 리터럴 (Object Literal): 
//    - 코드에 중괄호 { } 를 쓰는 순간, 메모리에 '완전히 새로운 빈 상자'가 하나 즉시 생성됩니다. 
//    - 무거운 클래스(Class) 선언 없이 곧바로 딕셔너리를 찍어내는 JS만의 강력한 문법입니다.
// 
// 2. 재할당 금지(No Reassignment) vs 가변/불변성(Mutable/Immutable):
//    - const는 데이터가 "불변(Immutable)"하다는 뜻이 아닙니다! 변수의 "재할당 금지"를 의미합니다.
//    - ❌ STATE = { isDarkMode: false }; 
//      -> 우측에 중괄호 { } 를 썼으므로 메모리에 '새로운 상자(주소값)'가 만들어집니다. 
//      -> = 기호는 STATE가 들고 있던 기존 상자의 주소를 방금 만든 새 상자의 주소로 '교체(재할당)' 하려 합니다.
//      -> const가 "주소값(목줄) 교체 사형!" 이라며 에러를 뱉습니다.
//    - ✅ STATE.isDarkMode = false;
//      -> 중괄호가 없으므로 새 상자를 만들지 않습니다.
//      -> 원래 주소로 찾아가서 뚜껑이 열려있는(Mutable) 기존 상자 안의 내용물만 쓱 바꿉니다. 완벽히 허용됩니다!
// 💡 과제 루브릭 필수: 로컬 스토리지(localStorage)를 활용하여 테마 설정 영구 유지!
// 
// [localStorage 란?]
// - 📍 브라우저 및 운영체제(OS)별 실제 물리적 저장 위치 (DB 파일 경로)
//   [Windows]
//   - Chrome: C:\Users\<사용자명>\AppData\Local\Google\Chrome\User Data\Default\Local Storage\leveldb
//   - Edge: C:\Users\<사용자명>\AppData\Local\Microsoft\Edge\User Data\Default\Local Storage\leveldb
//   - Firefox: C:\Users\<사용자명>\AppData\Roaming\Mozilla\Firefox\Profiles\<무작위>.default\webappsstore.sqlite
//
//   [macOS]
//   - Chrome: ~/Library/Application Support/Google/Chrome/Default/Local Storage/leveldb
//   - Safari: ~/Library/Safari/LocalStorage
//   - Firefox: ~/Library/Application Support/Firefox/Profiles/<무작위>.default/webappsstore.sqlite
//
//   [Linux]
//   - Chrome: ~/.config/google-chrome/Default/Local Storage/leveldb
//
//   [Mobile (보안 샌드박스로 인해 루팅/탈옥 없이 일반 접근 불가)]
//   - Android Chrome: /data/data/com.android.chrome/app_chrome/Default/Local Storage/leveldb
//   - iOS Safari: /var/mobile/Containers/Data/Application/<앱UUID>/Library/WebKit/WebsiteData/LocalStorage
// - 페이지를 새로고침(F5)하거나 브라우저를 껐다 켜도 절대 데이터가 지워지지 않습니다.
// - ⚠️ 브라우저/도메인 종속적: 크롬 캐비닛과 사파리(아이폰) 캐비닛은 완벽히 분리되어 있습니다.
//   (즉, 유저가 크롬에서 다크모드를 켰다고 해서, 엣지나 사파리 브라우저까지 다크모드가 되지는 않음)
// - 사용법: 꺼낼 때는 getItem('키'), 넣을 때는 setItem('키', '값')
//
// [이 코드가 없으면 벌어지는 일 (실무 대참사 & 과제 감점 사유)]
// - 유저가 폰에서 라이트모드로 기껏 바꿔놨는데, 페이지를 새로고침하는 순간 
//   메모리(RAM)에 있던 STATE 객체가 통째로 증발하면서 무조건 다크모드(초기값)로 강제 초기화됩니다.
// - 이를 막기 위해 시작하자마자 캐비닛(하드디스크)부터 뒤져서 예전 기록(savedTheme)을 꺼내오는 로직입니다.
const savedTheme = localStorage.getItem('portfolio_theme');

// [초기 상태 결정 로직 (삼항 연산자 Fallback)]
// - 사이트에 태어나서 처음 온 유저는 localStorage에 기록이 없으므로 savedTheme에 'null'이 들어갑니다.
// - 만약 "savedTheme === 'light' ? false : true" 로 짰다면: null은 'light'가 아니므로 무조건 뒤의 true(다크모드)가 기본값이 됩니다.
// - 하지만 "savedTheme === 'dark' ? true : false" 로 짜면: null은 'dark'가 아니므로 무조건 뒤의 false(라이트모드)가 기본값이 됩니다.
// - 💡 즉, "명시적으로 다크모드('dark')를 선택한 유저가 아니면, 첫 방문자(null)를 포함한 나머지는 싹 다 라이트모드로 밀어버리겠다"는 실무 테크닉입니다.
const STATE = {
    isDarkMode: savedTheme === 'dark' ? true : false 
};

// ----------------------------------------------------
// 0-1. 다크모드 테마 렌더링 로직 (State-Driven UI)
// ----------------------------------------------------
// 💡 과제 루브릭 필수: DOM 탐색 시 getElementById 대신 querySelector 사용!
// - getElementById: 오직 '아이디'만 찾을 수 있는 구형 함수 (속도는 미세하게 더 빠름)
// - querySelector: 아이디(#), 클래스(.), 자식태그(div > p) 등 CSS에서 쓰던 선택자 문법을 
//   그대로 사용하여 어떤 복잡한 요소라도 다 찾아낼 수 있는 최신 만능 함수. 
//   현대 프론트엔드 실무의 표준이므로 과제 채점 기준에서 강력하게 강제하고 있습니다!
const themeToggleBtn = document.querySelector('#theme-toggle');

// [화면 그리기 전담 함수] 오직 STATE 객체의 값만 보고 화면을 어떻게 그릴지 결정합니다.
function renderTheme() {
    const eyeblink = document.querySelector('#eyeblink-video');
    const profileImg = document.querySelector('#profile-img'); // 💡 방금 HTML에 추가한 이미지 선택
    if (STATE.isDarkMode) {
        document.body.setAttribute('data-theme', 'dark');
        
        // 💡 과제 루브릭: textContent vs innerHTML
        // - textContent: 넣은 값을 순수 글자로만 취급하여 그대로 출력함.
        // - innerHTML: 넣은 값 안에 HTML 태그(<i class...>)가 있으면, 실제 그래픽 요소로 렌더링해서 삽입함.
        // 우리는 버튼 안에 '해 모양 아이콘 이미지'를 넣어야 하므로 innerHTML을 사용했습니다!
        if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        if (profileImg) profileImg.src = './image/profile_dark.png'; // 다크모드용 이미지 적용
        
        // 💡 하드디스크 캐비닛에 "이 유저는 현재 다크모드임!" 이라고 영구 도장을 찍어둠
        localStorage.setItem('portfolio_theme', 'dark'); 
        
        // 💡 .catch(()=>{}) : 브라우저의 깐깐한 오토플레이(Autoplay) 정책 방어막!
        // 크롬/사파리는 유저가 화면을 클릭하기 전에 비디오를 강제 재생(play)하려고 하면 
        // 빨간 에러를 뿜으며 자바스크립트를 멈춰버립니다.
        // 그래서 ".catch(에러잡기) => {아무 행동도 하지 않음}" 이라는 침묵의 방패를 달아주어,
        // 에러가 나더라도 전체 코드가 터지지 않고 부드럽게 무시하고 넘어가도록 처리한 실무 핵심 꿀팁입니다.
        if (eyeblink && eyeblink.paused) eyeblink.play().catch(()=>{}); 
    } else {
        document.body.setAttribute('data-theme', 'light');
        if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        if (profileImg) profileImg.src = './image/profile_light.png'; // 라이트모드용 이미지 적용
        
        // 💡 하드디스크 캐비닛에 "이 유저는 현재 라이트모드임!" 이라고 영구 도장을 찍어둠
        localStorage.setItem('portfolio_theme', 'light'); 
        
        // 라이트모드 시 렌더링 중지 및 일시정지 (CPU, 배터리 최적화)
        if (eyeblink) eyeblink.pause();
    }
}

// ----------------------------------------------------
// 0-2. 초기 상태 렌더링 실행 (새로고침 시 로컬스토리지 복구용)
// ----------------------------------------------------
renderTheme();

// [이벤트 감지 (When-If-Then)] 
// 💡 과제 루브릭 필수: HTML에 onclick 속성을 쓰지 않고, addEventListener로 연결할 것!
// 
// [onclick vs addEventListener의 결정적 차이]
// 1. 관심사 분리(Separation of Concerns): 
//    HTML 파일 안에는 <button onclick="changeTheme()"> 처럼 자바스크립트 코드를 섞어 쓰면 안 됩니다. 
//    HTML은 뼈대만, JS는 논리만 담당하도록 완벽히 파일을 찢어놓는 것이 현대 프론트엔드의 철칙입니다.
// 2. 확장성 (가장 중요): 
//    onclick은 덮어쓰기(Overwrite) 방식이라 한 요소에 1개의 이벤트만 달 수 있습니다. 
//    반면 addEventListener는 귀를 여러 개 다는 방식이라, 
//    하나의 버튼 클릭에 10개의 각기 다른 함수를 동시에 실행하게 만들 수도 있습니다!
// [이 코드 블록의 작동 원리 해부]
// 1. 누구랑 연결되어 있나?
//    - 위에서 선언한 `themeToggleBtn` (즉, HTML의 <button id="theme-toggle">)과 연결되어 있습니다. (화면 우측 상단의 해/달 버튼)
// 2. 어떻게 동작하는가?
//    - if (themeToggleBtn): 방어 로직. 만약 HTML에서 누군가 실수로 저 버튼을 지웠다면, 에러를 내지 말고 그냥 넘어가라는 뜻입니다.
//    - .addEventListener('click', ...): 버튼에 '클릭 감지기'를 달아놓고 유저가 누를 때까지 무한 대기합니다.
//    - 유저가 클릭하면 아래 2단계가 순식간에 실행됩니다.
//      👉 1단계 (뇌 구조 바꾸기): STATE.isDarkMode = !STATE.isDarkMode; 
//           (! 기호는 반대로 뒤집으라는 뜻입니다. true면 false로, false면 true로 스위치를 똑딱 켭니다)
//      👉 2단계 (화면 다시 그리기): renderTheme();
//           스위치가 켜졌으니, 화면 그리기 전담 반장을 불러서 "바뀐 상태에 맞춰서 화면 전체 다시 칠해!" 라고 명령합니다.
//
// 💡 과제 루브릭 (ES6 문법 필수 사용): `() => {}`
//    이것이 바로 자바스크립트의 '화살표 함수(Arrow Function)'입니다!
//    C#이나 C++ 개발자이신 유저님에게 아주 익숙한 '람다(Lambda) 식'과 정확히 똑같은 개념입니다.
//    기존의 `function() {}` 보다 문법이 간결하고 this 바인딩 문제를 해결해주어 현대 JS 실무 표준으로 쓰입니다.
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        STATE.isDarkMode = !STATE.isDarkMode; // 1. 상태 갱신 (참 <-> 거짓 뒤집기)
        renderTheme();                        // 2. 화면 갱신 지시
    });
}

// ----------------------------------------------------
// 1. 바닐라 JS 스크롤리텔링 (다중 비디오 지원)
// ----------------------------------------------------
const videos = document.querySelectorAll('.bg-video');
let targetProgress = 0;
let currentProgress = 0;

if (videos.length > 0) {
    // 모든 동영상 메타데이터가 로드되면 일시정지
    videos.forEach(video => {
        video.addEventListener('loadedmetadata', () => {
            video.pause();
        });
    });

    window.addEventListener('scroll', () => {
        // [스크롤 퍼센트 구하는 공식의 핵심 원리 (단면도 비유)]
        // 브라우저의 좌표계는 무조건 '맨 꼭대기(위)가 0px' 입니다. (스크롤을 내릴수록 숫자가 커짐)
        // 웹페이지 전체 길이를 3000px, 유저의 모니터(브라우저 창) 세로 길이를 1000px이라 가정해 보겠습니다.
        //
        // 1. 맨 처음 사이트에 접속했을 때 (스크롤 0%)
        //   0px +===================+ <-- scrollY = 0px (스크롤 안 내림)
        //       ||                 || <-- 유저의 모니터 (1000px 차지)
        //       ||                 ||
        // 1000px+===================+
        //       |                   |
        //       |                   | <-- 아직 안 보임
        // 3000px+-------------------+
        // 유저의 모니터 창 크기(innerHeight)가 1000px이기 때문에, 스크롤을 하나도 안 내려도 이미 0~1000px 구간을 보고 있습니다.
        //
        // 2. 스크롤을 끝까지 다 내렸을 때 (스크롤 100%)
        //   0px +-------------------+
        //       |                   | <-- 이미 지나친 곳
        // 2000px+===================+ <-- scrollY의 최대값 = 2000px (이게 maxScroll!)
        //       ||                 || <-- 유저의 모니터 (1000px 차지)
        //       ||                 ||
        // 3000px+===================+
        // 스크롤을 맨 밑바닥(3000px 위치)까지 내리면 모니터 창(1000px)은 2000~3000px 지점을 덮고 있게 됩니다.
        //
        // 💡 결론: 왜 뺄셈을 하는가?
        // 자바스크립트에서 window.scrollY는 "모니터의 윗부분 모서리가 위에서부터 몇 px 떨어져 있는가?"를 측정합니다.
        // 위 그림처럼 모니터가 맨 밑바닥에 도달했을 때 모니터 윗부분의 위치는 3000px이 아니라 2000px입니다.
        // 그래서 "스크롤의 100% 한계점이 어디지?"를 계산할 때는 무조건:
        // 전체 웹페이지 길이(3000) - 내 모니터 크기(1000) = 2000(최대 이동 가능 거리) 라는 빼기 공식이 나오게 됩니다!
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        if (maxScroll <= 0) return;
        
        let progress = window.scrollY / maxScroll;
        
        // 스크롤 바운스 방지
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;
        
        // 초 단위 대신 '퍼센트(0~1)'를 목표치로 저장
        targetProgress = progress;
    });

    // 브라우저 프레임 주기에 맞춰 무한 반복되는 루프 함수
    function smoothVideoLoop() {
        // Lerp 알고리즘으로 퍼센트를 부드럽게 이동
        currentProgress += (targetProgress - currentProgress) * 0.08;
        
        // 화면에 있는 모든 비디오의 현재 프레임을 퍼센트에 맞게 각자 조종
        videos.forEach(video => {
            if (!STATE.isDarkMode) return; // 라이트모드일 때는 비디오 연산 전면 중단 (최적화)
            
            if (!isNaN(video.duration) && video.duration > 0) {
                const targetTime = video.duration * currentProgress;
                if (Math.abs(video.currentTime - targetTime) > 0.005) {
                    video.currentTime = targetTime;
                }
            }
        });
        
        requestAnimationFrame(smoothVideoLoop);
    }
    
    
    // 루프 시작
    requestAnimationFrame(smoothVideoLoop);
}

// ----------------------------------------------------
// 2. 푸터 눈 깜빡임 효과 (랜덤 간격 재생)
// ----------------------------------------------------
const eyeblinkVideo = document.querySelector('#eyeblink-video');

if (eyeblinkVideo) {
    // 비디오 재생 속도를 0.5배속(절반 속도)으로 느리게 설정 -> 지금은 1배속
    eyeblinkVideo.playbackRate = 1;

    // 동영상이 1회 재생을 마쳤을 때 이벤트 발생
    eyeblinkVideo.addEventListener('ended', () => {
        // 2초(2000) ~ 5초(5000) 사이의 랜덤 대기 시간 계산
        const randomDelay = Math.random() * 3000 + 2000;
        
        setTimeout(() => {
            eyeblinkVideo.currentTime = 0; // 처음 프레임으로 되감기
            const playPromise = eyeblinkVideo.play();
            
            // 크롬 브라우저의 절전 모드 등 강제 재생 차단 시 발생하는 AbortError 예외 처리
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn("[시스템 메시지] 절전 모드로 인해 자동 재생이 차단되었습니다.");
                });
            }
        }, randomDelay);
    });
}

// ----------------------------------------------------
// 3. 타자기(Typing) 애니메이션 (Hero 섹션)
// ----------------------------------------------------
const typingText = document.querySelector('#typing-text');
const texts = [
    "> Accessing Secure Database...",
    "> Welcome, Agent W.",
    "> System Override: SUCCESS"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if(!typingText) return;
    const currentText = texts[textIndex];
    
    if(isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 30 : 80;

    if(!isDeleting && charIndex === currentText.length) {
        speed = 2000; // 문장 완성 후 대기
        isDeleting = true;
    } else if(isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        speed = 500; // 다음 문장 시작 전 대기
    }
    
    setTimeout(typeEffect, speed);
}
// 페이지 로드 후 1초 뒤 애니메이션 시작
if(typingText) setTimeout(typeEffect, 1000);

// ----------------------------------------------------
// 4. Skills 네온 게이지 랜덤 애니메이션
// ----------------------------------------------------
const skillBars = document.querySelectorAll('.skill-bar-fill');
function randomizeSkills() {
    skillBars.forEach(bar => {
        // 40% ~ 95% 사이의 무작위 값으로 게이지 요동치게 만들기
        const randomWidth = Math.floor(Math.random() * 55) + 40;
        bar.style.width = `${randomWidth}%`;
    });
}
if(skillBars.length > 0) {
    setTimeout(randomizeSkills, 500);    // 초기 애니메이션
    setInterval(randomizeSkills, 2000);  // 2초마다 게이지 변동
}
