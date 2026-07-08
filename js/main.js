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
let initialDarkMode = false;
if (savedTheme) {
    // 1. 유저가 이전에 선택한 테마가 있다면 그걸 최우선으로 따름
    initialDarkMode = savedTheme === 'dark';
} else {
    // 2. 저장된 테마가 없다면 (첫 방문), 사용자 기기의 시스템 설정(다크모드 여부)을 감지
    initialDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

const STATE = {
    isDarkMode: initialDarkMode
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
        
        // 💡 유저 요청: 라이트모드에서도 이스터에그처럼 눈알이 깜빡이도록 비디오 일시정지 해제
        if (eyeblink && eyeblink.paused) eyeblink.play().catch(()=>{});
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

// ----------------------------------------------------
// 5. 모바일 햄버거 메뉴 및 위로 가기 버튼 로직
// ----------------------------------------------------
const mobileMenuBtn = document.querySelector('#mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const scrollTopBtn = document.querySelector('#scroll-top-btn');

// 5-1. 햄버거 메뉴 토글 로직
if (mobileMenuBtn && navLinks) {
    // 햄버거 버튼 클릭 시 메뉴 열기/닫기
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // 버튼 클릭이 document로 전파되는 것 방지
        navLinks.classList.toggle('active');
    });

    // 💡 유저 요청: 외부(다른 곳) 클릭 시 메뉴 알아서 사라지게 하기
    document.addEventListener('click', (e) => {
        // 메뉴가 열려있고, 클릭한 타겟이 메뉴 내부가 아닐 때 닫기
        if (navLinks.classList.contains('active') && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });

    // 메뉴 안의 링크(Home, About 등)를 클릭해서 페이지가 이동할 때도 깔끔하게 닫아주기
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// 5-2. 위로 가기 버튼 스크롤 감지 및 클릭 로직
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        // 스크롤을 300px 이상 내렸을 때만 버튼을 화면에 표시
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        // 부드럽게 화면 맨 위(top: 0)로 스크롤 이동
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ----------------------------------------------------
// 6. GitHub API 연동 (비동기 통신)
// ----------------------------------------------------
const GITHUB_USERNAME = 'wow2658';
const projectGrid = document.querySelector('#project-grid');

let allGithubRepos = [];
let currentProjFilter = 'all';
let currentProjPage = 0;
const cardsPerPage = 2; // 데스크톱에서는 2개씩

async function fetchGithubRepos() {
    if (!projectGrid) return;

    try {
        projectGrid.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> 데이터 로딩 중...</div>';

        const targetRepos = [
            'Unreal_IROAS', 
            'Unreal_Left4Dead2', 
            'Unity_OverCooked', 
            'LyraDev_UE54'
        ];
        
        const repoPromises = targetRepos.map(repoName => 
            fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`)
        );
        
        const responses = await Promise.all(repoPromises);
        
        const failedResponse = responses.find(res => !res.ok);
        if (failedResponse) {
            throw new Error(`통신 에러 발생: ${failedResponse.status}`);
        }

        const repos = await Promise.all(responses.map(res => res.json()));

        if (repos.length === 0) {
            projectGrid.innerHTML = '<div class="error-message">공개된 Repository가 없습니다.</div>';
            return;
        }

        const YOUTUBE_LINKS = {
            'Unreal_IROAS': 'ggYh9wlE8G4',
            'Unreal_Left4Dead2': 'Y8r53TZZkIY',
            'Unity_OverCooked': 'NUkG66NQ4tA',
            'LyraDev_UE54': 'fYhED5rY9Uo'
        };

        const REPO_METADATA = {
            'Unreal_IROAS': {
                title: 'Unreal5 VR',
                description: 'Boss, enemy 프로그래밍, 시네마틱 담당'
            },
            'Unreal_Left4Dead2': {
                title: 'Unreal5 멀티FPS',
                description: 'Player, 시네마틱 담당'
            },
            'Unity_OverCooked': {
                title: 'Unity 탑뷰 파티',
                description: '프로그래밍 담당'
            },
            'LyraDev_UE54': {
                title: 'Unreal5 Lyra',
                description: '멀티 TPS 프로그래밍, 레벨디자인'
            }
        };

        // 데이터를 정제하여 전역 배열에 저장
        allGithubRepos = repos.map(repo => {
            let language = repo.language || 'Classified';
            if (repo.name === 'Unity_OverCooked') language = 'C#';

            const meta = REPO_METADATA[repo.name] || {};
            return {
                ...repo,
                displayLanguage: language,
                youtubeId: YOUTUBE_LINKS[repo.name],
                displayName: meta.title || repo.name,
                displayDesc: meta.description || repo.description || '상세 정보가 업데이트 중입니다.'
            };
        });

        // --- 🎨 UI 시뮬레이션용 더미 데이터 삽입 ---
        // 왼쪽 끝에 로딩->에러 프레임 추가
        allGithubRepos.push({ isDummyError: true, displayLanguage: 'Dummy' });
        // 오른쪽 끝에 로딩->빈상태 프레임 추가
        allGithubRepos.push({ isDummyEmpty: true, displayLanguage: 'Dummy' });
        // ---------------------------------------------


        // 렌더링 함수 최초 호출
        updateProjCarousel();

    } catch (error) {
        console.warn('GitHub API Error (Rate Limit). Using fallback data...', error);
        
        const YOUTUBE_LINKS = {
            'Unreal_IROAS': 'ggYh9wlE8G4',
            'Unreal_Left4Dead2': 'Y8r53TZZkIY',
            'Unity_OverCooked': 'NUkG66NQ4tA',
            'LyraDev_UE54': 'fYhED5rY9Uo'
        };

        const REPO_METADATA = {
            'Unreal_IROAS': {
                title: 'Unreal5 VR',
                description: 'Boss, enemy 프로그래밍, 시네마틱 담당'
            },
            'Unreal_Left4Dead2': {
                title: 'Unreal5 멀티FPS',
                description: 'Player, 시네마틱 담당'
            },
            'Unity_OverCooked': {
                title: 'Unity 탑뷰 파티',
                description: '프로그래밍 담당'
            },
            'LyraDev_UE54': {
                title: 'Unreal5 Lyra',
                description: '멀티 TPS 프로그래밍, 레벨디자인'
            }
        };

        // 차단 시 임시로 보여줄 폴백(Fallback) 하드코딩 데이터
        const fallbackRepos = [
            { name: 'Unreal_IROAS', language: 'C++', html_url: 'https://github.com/gonootago/Unreal_IROAS' },
            { name: 'Unreal_Left4Dead2', language: 'C++', html_url: 'https://github.com/gonootago/Unreal_Left4Dead2' },
            { name: 'Unity_OverCooked', language: 'C#', html_url: 'https://github.com/gonootago/Unity_OverCooked' },
            { name: 'LyraDev_UE54', language: 'C++', html_url: 'https://github.com/gonootago/LyraDev_UE54' }
        ];

        // 👉 1. [상태 변경] 통신 실패 시에도 전역 상태(allGithubRepos) 배열을 가짜 데이터로 덮어씌웁니다.
        allGithubRepos = fallbackRepos.map(repo => {
            let language = repo.language || 'Classified';
            if (repo.name === 'Unity_OverCooked') language = 'C#';

            const meta = REPO_METADATA[repo.name] || {};
            return {
                ...repo,
                displayLanguage: language,
                youtubeId: YOUTUBE_LINKS[repo.name],
                displayName: meta.title || repo.name,
                displayDesc: meta.description || repo.description || '상세 정보가 업데이트 중입니다.'
            };
        });

        // --- 🎨 UI 시뮬레이션용 더미 데이터 삽입 ---
        allGithubRepos.push({ isDummyError: true, displayLanguage: 'Dummy' });
        allGithubRepos.push({ isDummyEmpty: true, displayLanguage: 'Dummy' });

        // 👉 2. [화면 렌더링] 상태 세팅이 완벽히 끝나면 화면을 그립니다.
        updateProjCarousel();
    }
}

// 필터 및 페이지네이션을 적용하여 화면을 그리는 함수
function updateProjCarousel() {
    if (!projectGrid) return;
    
    // 1. 필터링
    let filteredRepos = allGithubRepos;
    if (currentProjFilter !== 'all') {
        filteredRepos = allGithubRepos.filter(repo => repo.displayLanguage === currentProjFilter);
    }

    // 2. 모바일/데스크톱 표시 개수
    const currentCardsPerPage = window.innerWidth <= 768 ? 1 : cardsPerPage;
    const maxPage = Math.max(0, Math.ceil(filteredRepos.length / currentCardsPerPage) - 1);
    
    // 페이지 범위를 벗어나지 않게 보정
    if (currentProjPage > maxPage) currentProjPage = maxPage;

    // 3. 자르기(Pagination Slice)
    const startIndex = currentProjPage * currentCardsPerPage;
    const currentSlice = filteredRepos.slice(startIndex, startIndex + currentCardsPerPage);

    projectGrid.innerHTML = '';

    if (currentSlice.length === 0) {
        projectGrid.innerHTML = '<div class="error-message">해당 조건의 프로젝트가 없습니다.</div>';
    } else {
        currentSlice.forEach(repo => {
            // ES6 구조분해 할당 (Destructuring Assignment) 적용
            const { youtubeId, displayName, displayDesc, displayLanguage, html_url, isDummyError, isDummyEmpty } = repo;

            // 시맨틱 태그(article) 적용
            const card = document.createElement('article');
            card.className = 'project-card fade-in';
            if (window.scrollObserver) window.scrollObserver.observe(card);

            if (isDummyError) {
                card.innerHTML = `
                    <div class="dummy-loader" style="height: 100%; min-height: 300px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
                        <i class="fas fa-spinner fa-spin" style="font-size: 2rem; margin-bottom: 1rem; color: #888;"></i>
                        <p style="color: #888;">데이터를 불러오는 중...</p>
                    </div>
                    <div class="dummy-content" style="display: none; height: 100%; min-height: 300px; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 2rem;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--accent-danger);"></i>
                        <h3 style="margin-bottom: 0.5rem; color: var(--accent-danger);">API 호출 실패</h3>
                        <p style="font-size: 0.95rem; color: #aaa; margin-bottom: 1rem; line-height: 1.5;">
                            인증 없는 API 호출로 인해 <strong>시간당 60회 제한(Rate Limit)</strong>을 초과하여 <br>
                            <span style="color: var(--accent-danger);">403 Forbidden 응답</span>을 받았습니다.
                        </p>
                        <button class="btn outline-btn dummy-retry-btn" style="margin-top: 1.5rem; border-color: var(--accent-danger); color: var(--accent-danger);">재시도</button>
                    </div>
                `;
                projectGrid.appendChild(card);
                
                // 재시도 버튼 이벤트 연결
                const retryBtn = card.querySelector('.dummy-retry-btn');
                if (retryBtn) {
                    retryBtn.addEventListener('click', () => {
                        fetchGithubRepos(); // API 재호출 (상태 초기화 및 로딩 시작)
                    });
                }

                // 1.5초 후 로딩 -> 에러 상태로 전환 (시뮬레이션)
                setTimeout(() => {
                    const loader = card.querySelector('.dummy-loader');
                    const content = card.querySelector('.dummy-content');
                    if (loader && content) {
                        loader.style.display = 'none';
                        content.style.display = 'flex';
                    }
                }, 1500);
                return;
            }

            if (isDummyEmpty) {
                card.innerHTML = `
                    <div class="dummy-loader" style="height: 100%; min-height: 300px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
                        <i class="fas fa-spinner fa-spin" style="font-size: 2rem; margin-bottom: 1rem; color: #888;"></i>
                        <p style="color: #888;">데이터를 불러오는 중...</p>
                    </div>
                    <div class="dummy-content" style="display: none; height: 100%; min-height: 300px; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 2rem;">
                        <i class="fas fa-folder-open" style="font-size: 2.5rem; margin-bottom: 1rem; color: #666;"></i>
                        <h3 style="margin-bottom: 0.5rem; color: #888;">프로젝트 없음</h3>
                        <p style="font-size: 0.9rem; color: #666;">해당 카테고리에 등록된<br>공개 레포지토리가 없습니다.</p>
                    </div>
                `;
                projectGrid.appendChild(card);
                
                // 1.5초 후 로딩 -> 빈 상태로 전환 (시뮬레이션)
                setTimeout(() => {
                    const loader = card.querySelector('.dummy-loader');
                    const content = card.querySelector('.dummy-content');
                    if (loader && content) {
                        loader.style.display = 'none';
                        content.style.display = 'flex';
                    }
                }, 1500);
                return;
            }
            
            const videoHtml = youtubeId 
                ? `<div class="project-video"><iframe src="https://www.youtube.com/embed/${youtubeId}?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>` 
                : '';

            card.innerHTML = `
                ${videoHtml}
                <div class="project-info">
                    <h3>${displayName}</h3>
                    <p>${displayDesc}</p>
                    <div class="project-tags">
                        <span class="tag">${displayLanguage}</span>
                    </div>
                </div>
                <div class="project-links">
                    <a href="${html_url}" target="_blank" class="btn outline-btn">VIEW CODE</a>
                </div>
            `;
            projectGrid.appendChild(card);
        });
    }

    // 4. 버튼 활성/비활성 처리
    const prevBtn = document.getElementById('proj-prev-btn');
    const nextBtn = document.getElementById('proj-next-btn');
    if (prevBtn) prevBtn.disabled = currentProjPage === 0;
    if (nextBtn) nextBtn.disabled = currentProjPage >= maxPage;
}

// 좌우 화살표 이벤트 달기
const projPrevBtn = document.getElementById('proj-prev-btn');
const projNextBtn = document.getElementById('proj-next-btn');
if (projPrevBtn) {
    projPrevBtn.addEventListener('click', () => {
        if (currentProjPage > 0) {
            currentProjPage--;
            updateProjCarousel();
        }
    });
}
if (projNextBtn) {
    projNextBtn.addEventListener('click', () => {
        currentProjPage++;
        updateProjCarousel();
    });
}

// 화면 크기가 변할 때 페이지 재계산 (반응형 대응)
window.addEventListener('resize', () => {
    updateProjCarousel();
});

// 필터 버튼 이벤트 달기 (상태 관리 패턴 적용)
// 💡 [이벤트 -> 상태 -> 렌더링] 흐름의 두 번째 예시입니다.
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // 기존 active 클래스 제거
        filterBtns.forEach(b => b.classList.remove('active'));
        // 누른 버튼에 active 추가
        e.target.classList.add('active');
        
        // 👉 1. [상태 변경] DOM(화면)의 요소들을 직접 숨기거나 지우지 않습니다.
        // 오직 내 머릿속 데이터(currentProjFilter)만 바꿉니다.
        currentProjFilter = e.target.getAttribute('data-filter');
        currentProjPage = 0; // 페이지도 1페이지로 리셋

        // 👉 2. [화면 렌더링] 바뀐 상태를 토대로 화면 그리기 전담 반장을 호출합니다.
        updateProjCarousel();
    });
});

// 시작
fetchGithubRepos();

// ----------------------------------------------------
// 7. TA Effect 갤러리 및 시네마틱 라이트박스 로직 (고도화)
// ----------------------------------------------------
const effectGrid = document.querySelector('#ta-effect-grid');
const lightboxModal = document.querySelector('#lightbox-modal');
const lightboxImg = document.querySelector('#lightbox-img');
const lightboxCaption = document.querySelector('#lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const lightboxFullscreen = document.querySelector('.lightbox-fullscreen');

// 현재 보고 있는 이미지 인덱스
let currentLightboxIndex = 0;

// WebP 및 PNG 이펙트 슬라이드 전체 목록
const effectImages = [
    { src: './image/effect/슬라이드20.PNG', caption: '이펙트 포트폴리오 슬라이드 20' },
    { src: './image/effect/슬라이드21페이지.webp', caption: '이펙트 포트폴리오 슬라이드 21' },
    { src: './image/effect/슬라이드22페이지.webp', caption: '이펙트 포트폴리오 슬라이드 22' },
    { src: './image/effect/슬라이드23페이지.webp', caption: '이펙트 포트폴리오 슬라이드 23' },
    { src: './image/effect/슬라이드24.PNG', caption: '이펙트 포트폴리오 슬라이드 24' },
    { src: './image/effect/슬라이드25페이지.webp', caption: '이펙트 포트폴리오 슬라이드 25' },
    { src: './image/effect/슬라이드26.PNG', caption: '이펙트 포트폴리오 슬라이드 26' },
    { src: './image/effect/슬라이드27.PNG', caption: '이펙트 포트폴리오 슬라이드 27' },
    { src: './image/effect/슬라이드28.PNG', caption: '이펙트 포트폴리오 슬라이드 28' },
    { src: './image/effect/슬라이드37.PNG', caption: '이펙트 포트폴리오 슬라이드 37' },
    { src: './image/effect/슬라이드38.PNG', caption: '이펙트 포트폴리오 슬라이드 38' },
    { src: './image/effect/슬라이드39.PNG', caption: '이펙트 포트폴리오 슬라이드 39' },
    { src: './image/effect/슬라이드40.PNG', caption: '이펙트 포트폴리오 슬라이드 40' }
];

// 특정 인덱스의 이미지를 라이트박스에 세팅하는 함수
function showLightboxImage(index) {
    if (index < 0) index = effectImages.length - 1; // 처음에서 이전 누르면 끝으로 루프
    if (index >= effectImages.length) index = 0; // 끝에서 다음 누르면 처음으로 루프
    
    currentLightboxIndex = index;
    lightboxImg.src = effectImages[index].src;
    lightboxCaption.textContent = effectImages[index].caption;
}

// 라이트박스를 닫는 실제 내부 함수
function closeLightbox() {
    lightboxModal.style.display = 'none';
    if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
    }
    document.body.style.overflow = 'auto'; // 스크롤 잠금 해제
    
    // 라이트박스 모드 초기화 (이미지 뷰어 복원)
    const customWrapper = document.getElementById('lightbox-custom-wrapper');
    const lightboxImageContainer = document.querySelector('.lightbox-image-container');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxControls = document.querySelectorAll('.lightbox-prev, .lightbox-next');
    
    if (customWrapper) {
        customWrapper.style.display = 'none';
        customWrapper.innerHTML = '';
    }
    if (lightboxImg) lightboxImg.style.display = 'block';
    lightboxControls.forEach(el => el.style.display = '');
}

// 사용자가 X버튼이나 배경을 눌러서 닫기를 '요청'하는 함수 (히스토리 정리 포함)
function requestCloseLightbox() {
    if (history.state && history.state.lightbox) {
        history.back(); // 이 액션이 popstate 이벤트를 발생시켜 안전하게 닫힘
    } else {
        closeLightbox();
    }
}

// 현재 인라인 카드에서 보고 있는 인덱스
let inlineGalleryIndex = 0;

function renderEffectGallery() {
    if (!effectGrid) return;
    effectGrid.innerHTML = ''; // 초기화

    // 스크롤 압박을 줄이기 위한 대표 카드 생성
    const card = document.createElement('div');
    card.className = 'project-card gallery-card fade-in';
    if (window.scrollObserver) window.scrollObserver.observe(card);
    
    // 썸네일 이미지
    const img = document.createElement('img');
    img.src = effectImages[inlineGalleryIndex].src;
    img.alt = effectImages[inlineGalleryIndex].caption;
    card.appendChild(img);
    
    // 카드 내장(Inline) 좌우 화살표 생성
    const inlinePrev = document.createElement('span');
    inlinePrev.innerHTML = '&#10094;';
    inlinePrev.className = 'inline-prev';
    card.appendChild(inlinePrev);

    const inlineNext = document.createElement('span');
    inlineNext.innerHTML = '&#10095;';
    inlineNext.className = 'inline-next';
    card.appendChild(inlineNext);
    
    // 우측 하단 슬라이드 장수 표시 (캡슐 오버레이 제거, 단순 텍스트화)
    const badge = document.createElement('div');
    badge.className = 'inline-badge';
    badge.textContent = `1 / ${effectImages.length}`;
    card.appendChild(badge);
    
    // 인라인 화살표 클릭 이벤트 (이전)
    inlinePrev.addEventListener('click', (e) => {
        e.stopPropagation();
        inlineGalleryIndex--;
        if (inlineGalleryIndex < 0) inlineGalleryIndex = effectImages.length - 1;
        updateInlineGallery();
    });

    // 인라인 화살표 클릭 이벤트 (다음)
    inlineNext.addEventListener('click', (e) => {
        e.stopPropagation();
        inlineGalleryIndex++;
        if (inlineGalleryIndex >= effectImages.length) inlineGalleryIndex = 0;
        updateInlineGallery();
    });

    // 인라인 갤러리 이미지 업데이트 함수
    function updateInlineGallery() {
        img.src = effectImages[inlineGalleryIndex].src;
        img.alt = effectImages[inlineGalleryIndex].caption;
        badge.textContent = `${inlineGalleryIndex + 1} / ${effectImages.length}`;
    }
    
    // 카드 자체(또는 이미지) 클릭 시 라이트박스 오픈 및 전체화면(PC/모바일 공통)
    card.addEventListener('click', () => {
        showLightboxImage(inlineGalleryIndex); // 현재 인라인에서 보던 인덱스부터 오픈
        lightboxModal.style.display = 'block';
        history.pushState({ lightbox: true }, '', '#lightbox');

        // PC/모바일 상관없이 넷플릭스처럼 무조건 자동 전체화면 실행
        if (lightboxModal.requestFullscreen) {
            lightboxModal.requestFullscreen().then(() => {
                // 전체화면 진입 성공 시 가능하면 가로 모드(Landscape)로 강제 고정 시도 (주로 모바일)
                if (screen.orientation && screen.orientation.lock) {
                    screen.orientation.lock('landscape').catch(err => {
                        console.log('가로모드 고정 미지원 기기:', err);
                    });
                }
            }).catch(err => {
                console.error('자동 전체화면 에러:', err);
            });
        }
    });
    
    effectGrid.appendChild(card);
}

// --- 이벤트 리스너 등록 ---
if (lightboxModal) {
    // 좌우 화살표 클릭
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation(); // 모달 닫힘(배경 클릭) 방지
            showLightboxImage(currentLightboxIndex - 1);
        });
    }
    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            showLightboxImage(currentLightboxIndex + 1);
        });
    }

    // 전체화면 버튼 클릭
    if (lightboxFullscreen) {
        lightboxFullscreen.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!document.fullscreenElement) {
                lightboxModal.requestFullscreen().catch(err => {
                    console.error(`전체화면 에러: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        });
    }

    // 닫기 버튼 클릭
    if (lightboxClose) {
        lightboxClose.addEventListener('click', requestCloseLightbox);
    }

    // 팝업 바깥쪽(검은 배경 및 여백)을 클릭해도 닫히도록 설정
    window.addEventListener('click', (e) => {
        // 모달 배경이거나, 이미지 바깥의 래퍼들을 클릭했을 때만 닫기
        if (e.target === lightboxModal || 
            e.target.classList.contains('lightbox-content-wrapper') || 
            e.target.classList.contains('lightbox-image-container')) {
            requestCloseLightbox();
        }
    });

    // 키보드 연동 (ESC로 닫기, 좌우 화살표로 넘기기)
    window.addEventListener('keydown', (e) => {
        if (lightboxModal.style.display === 'block') {
            if (e.key === 'Escape') {
                requestCloseLightbox();
            } else if (e.key === 'ArrowLeft') {
                showLightboxImage(currentLightboxIndex - 1);
            } else if (e.key === 'ArrowRight') {
                showLightboxImage(currentLightboxIndex + 1);
            }
        }
    });

    // 모바일 기기 뒤로가기 방어 로직 (History API)
    window.addEventListener('popstate', (e) => {
        // 뒤로가기를 눌러서 lightbox 상태가 빠졌을 때 라이트박스 닫기
        if (!e.state || !e.state.lightbox) {
            closeLightbox();
        }
    });
}

// 갤러리 렌더링 실행
renderEffectGallery();

// ----------------------------------------------------
// 9. 3D 애니메이션 포트폴리오 순차 재생 (Sequential Video Playback)
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const animVideo = document.getElementById('ta-anim-video');
    if (animVideo) {
        const animSources = [
            './image/3danimation/Gif6.webm',
            './image/3danimation/Gif8.webm'
        ];
        let currentAnimIndex = 0;

        animVideo.addEventListener('ended', () => {
            currentAnimIndex = (currentAnimIndex + 1) % animSources.length;
            animVideo.src = animSources[currentAnimIndex];
            animVideo.play().catch(e => console.error('비디오 순차재생 에러:', e));
        });
    }
});

// ----------------------------------------------------
// 10. Image Comparison Slider 로직 (2D Art & Design)
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const artBaseImg = document.getElementById('art-base-img');
    const artOverlayImg = document.getElementById('art-overlay-img');
    const artPrevBtn = document.getElementById('art-prev-btn');
    const artNextBtn = document.getElementById('art-next-btn');
    const artSlider = document.getElementById('art-slider-range');
    const artContainer = document.getElementById('art-comparison-container');

    if (artBaseImg && artOverlayImg && artPrevBtn && artNextBtn && artSlider) {
        const artSets = [
            { after: './image/2dart/1-1.webp', before: './image/2dart/1-2.webp' },
            { after: './image/2dart/2-1.jpg', before: './image/2dart/2-2.jpg' },
            { after: './image/2dart/3-1.jpg', before: './image/2dart/3-2.jpg' }
        ];
        let currentArtIndex = 0;

        function updateArtSet(index) {
            artOverlayImg.src = artSets[index].after;
            artBaseImg.src = artSets[index].before;
            // 작품을 바꿀 때마다 슬라이더를 중앙(50%)으로 리셋하여 둘 다 보이게 함
            artSlider.value = 50;
            artContainer.style.setProperty('--slider-pos', '50%');
        }

        artPrevBtn.addEventListener('click', () => {
            currentArtIndex = (currentArtIndex - 1 + artSets.length) % artSets.length;
            updateArtSet(currentArtIndex);
        });

        artNextBtn.addEventListener('click', () => {
            currentArtIndex = (currentArtIndex + 1) % artSets.length;
            updateArtSet(currentArtIndex);
        });

        artSlider.addEventListener('input', (e) => {
            artContainer.style.setProperty('--slider-pos', e.target.value + '%');
        });
    }
});

// ----------------------------------------------------
// 12. Contact Form Validation (문의 폼 유효성 검증)
// ----------------------------------------------------
// 💡 [이벤트 -> 상태 -> 렌더링] 흐름의 마지막 예시입니다.
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        // 1. [이벤트 차단] 기본 제출 동작 방지 (페이지 새로고침 방지)
        event.preventDefault();
        
        // 👉 2. [상태 선언] isValid 라는 데이터 상태를 먼저 만듭니다.
        
        // 2. 이름 검증 (빈 필드 불가)
        const nameInput = document.getElementById('name');
        const nameError = document.getElementById('name-error');
        if (!nameInput.value.trim()) {
            nameError.textContent = '이름을 입력해주세요.';
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameError.style.display = 'none';
        }
        
        // 3. 이메일 검증 (빈 필드 불가 및 정규식)
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 간단한 이메일 정규식
        
        if (!emailInput.value.trim()) {
            emailError.textContent = '이메일을 입력해주세요.';
            emailError.style.display = 'block';
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = '올바른 이메일 형식이 아닙니다.';
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }
        
        // 4. 메시지 검증 (빈 필드 불가)
        const messageInput = document.getElementById('message');
        const messageError = document.getElementById('message-error');
        if (!messageInput.value.trim()) {
            messageError.textContent = '메시지를 입력해주세요.';
            messageError.style.display = 'block';
            isValid = false;
        } else {
            messageError.style.display = 'none';
        }
        
        // 5. 검증 통과 시 성공 처리 및 실제 메일 발송 (AJAX)
        if (isValid) {
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = '전송 중...';
            submitBtn.disabled = true;

            // Formspree로 폼 데이터 비동기 전송
            fetch(contactForm.action, {
                method: contactForm.method,
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    const successMsg = document.getElementById('success-msg');
                    successMsg.style.display = 'block';
                    
                    // 폼 초기화
                    contactForm.reset();
                    
                    // 3초 후 성공 메시지 숨김
                    setTimeout(() => {
                        successMsg.style.display = 'none';
                    }, 3000);
                } else {
                    alert('전송 중 문제가 발생했습니다. Endpoint 주소를 확인해주세요.');
                }
            })
            .catch(error => {
                alert('네트워크 오류가 발생했습니다.');
                console.error(error);
            })
            .finally(() => {
                // 버튼 상태 원상 복구
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
        }
    });
}

// ----------------------------------------------------
// 13. 스크롤 인터랙션 (Navbar, Scroll To Top, Intersection Observer)
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const scrollTopBtn = document.getElementById('scroll-top-btn');

    // 13-1. 네비게이션 배경색 변경 & 스크롤탑 버튼 표시 로직
    window.addEventListener('scroll', () => {
        // 스크롤 60px 이상 시 네비게이션 스타일 변경
        if (navbar) {
            if (window.scrollY > 60) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // 스크롤 300px 이상 시 위로 가기 버튼 표시
        if (scrollTopBtn) {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
    });

    // 스크롤탑 버튼 클릭 이벤트
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 13-2. 스크롤 애니메이션 (Intersection Observer)
    const observerOptions = {
        threshold: 0.2 // 요소가 20% 보일 때 트리거
    };

    window.scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 한 번 보인 요소는 다시 관찰하지 않음 (성능 최적화)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => window.scrollObserver.observe(el));
});
