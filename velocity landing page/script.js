// Sign In Modal Logic
const signinModal = document.getElementById('signin-modal');
const signinBtn = document.getElementById('signin-btn');
const navStartBtn = document.getElementById('nav-start-btn');
const heroStartBtn = document.getElementById('hero-start-btn');
const signinClose = document.getElementById('signin-close');

const openSignin = () => {
    signinModal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

const closeSignin = () => {
    signinModal.classList.remove('active');
    document.body.style.overflow = '';
};

signinBtn.addEventListener('click', openSignin);
navStartBtn.addEventListener('click', openSignin);
heroStartBtn.addEventListener('click', openSignin);
signinClose.addEventListener('click', closeSignin);
signinModal.addEventListener('click', (e) => {
    if (e.target === signinModal) closeSignin();
});

// Video Modal Logic
const videoModal = document.getElementById('video-modal');
const heroDemoBtn = document.getElementById('hero-demo-btn');
const videoClose = document.getElementById('video-close');

heroDemoBtn.addEventListener('click', () => {
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

const closeVideo = () => {
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
};

videoClose.addEventListener('click', closeVideo);
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideo();
});

// Escape Key Handler
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSignin();
        closeVideo();
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});