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
const eyeblinkVideo = document.getElementById('eyeblink-video');

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
const typingText = document.getElementById('typing-text');
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
