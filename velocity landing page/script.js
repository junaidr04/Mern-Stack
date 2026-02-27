// =========================================
// Theme Toggle (Dark/Light Mode)
// =========================================
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// =========================================
// Modal State Management
// =========================================
let currentUser = null;

// Sign In Modal Elements
const signinModal = document.getElementById('signin-modal');
const signinBtn = document.getElementById('signin-btn');
const navStartBtn = document.getElementById('nav-start-btn');
const heroStartBtn = document.getElementById('hero-start-btn');
const signinClose = document.getElementById('signin-close');
const signinForm = document.getElementById('signin-form');
const signinFormContainer = document.getElementById('signin-form-container');
const signinSuccess = document.getElementById('signin-success');
const continueBtn = document.getElementById('continue-btn');

// Sign Up Modal Elements
const signupModal = document.getElementById('signup-modal');
const signupClose = document.getElementById('signup-close');
const signupForm = document.getElementById('signup-form');
const signupFormContainer = document.getElementById('signup-form-container');
const signupSuccess = document.getElementById('signup-success');
const startBuildingBtn = document.getElementById('start-building-btn');

// Switch Links
const switchToSignup = document.getElementById('switch-to-signup');
const switchToSignin = document.getElementById('switch-to-signin');

// Password Elements
const signupPassword = document.getElementById('signup-password');
const signupConfirmPassword = document.getElementById('signup-confirm-password');
const passwordStrength = document.getElementById('password-strength');
const passwordMatch = document.getElementById('password-match');

// =========================================
// Open/Close Modal Functions
// =========================================
const openModal = (modal) => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

const closeModal = (modal) => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
};

// Reset modal to form state
const resetSigninModal = () => {
    signinFormContainer.style.display = 'block';
    signinSuccess.style.display = 'none';
    signinForm.reset();
};

const resetSignupModal = () => {
    signupFormContainer.style.display = 'block';
    signupSuccess.style.display = 'none';
    signupForm.reset();
    resetPasswordStrength();
};

// =========================================
// Sign In Modal Logic
// =========================================
signinBtn.addEventListener('click', () => {
    resetSigninModal();
    openModal(signinModal);
});

navStartBtn.addEventListener('click', () => {
    resetSignupModal();
    openModal(signupModal);
});

heroStartBtn.addEventListener('click', () => {
    resetSignupModal();
    openModal(signupModal);
});

signinClose.addEventListener('click', () => closeModal(signinModal));
signinModal.addEventListener('click', (e) => {
    if (e.target === signinModal) closeModal(signinModal);
});

// Sign In Form Submit
signinForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    // Simulate sign in (in real app, this would be an API call)
    const userName = email.split('@')[0];
    currentUser = {
        name: userName.charAt(0).toUpperCase() + userName.slice(1),
        email: email
    };

    // Update success state
    document.getElementById('signed-user-avatar').textContent = currentUser.name.charAt(0).toUpperCase();
    document.getElementById('signed-user-email').textContent = currentUser.email;

    // Show success state
    signinFormContainer.style.display = 'none';
    signinSuccess.style.display = 'block';
});

// Continue Button
continueBtn.addEventListener('click', () => {
    closeModal(signinModal);
    // You can redirect or update UI to show logged-in state here
    alert(`Welcome, ${currentUser.name}! You are now signed in.`);
});

// =========================================
// Sign Up Modal Logic
// =========================================
signupClose.addEventListener('click', () => closeModal(signupModal));
signupModal.addEventListener('click', (e) => {
    if (e.target === signupModal) closeModal(signupModal);
});

// Switch between modals
switchToSignup.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(signinModal);
    setTimeout(() => {
        resetSignupModal();
        openModal(signupModal);
    }, 300);
});

switchToSignin.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(signupModal);
    setTimeout(() => {
        resetSigninModal();
        openModal(signinModal);
    }, 300);
});

// Password Strength Checker
const checkPasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;

    if (strength <= 1) return 'weak';
    if (strength <= 2) return 'medium';
    return 'strong';
};

const resetPasswordStrength = () => {
    const strengthBar = passwordStrength.querySelector('.strength-bar');
    const strengthText = passwordStrength.querySelector('.strength-text');

    strengthBar.className = 'strength-bar';
    strengthText.className = 'strength-text';
    strengthText.textContent = 'Password strength';
    passwordMatch.textContent = '';
};

signupPassword.addEventListener('input', (e) => {
    const password = e.target.value;
    const strengthBar = passwordStrength.querySelector('.strength-bar');
    const strengthText = passwordStrength.querySelector('.strength-text');

    if (password.length === 0) {
        resetPasswordStrength();
        return;
    }

    const strength = checkPasswordStrength(password);

    strengthBar.className = `strength-bar ${strength}`;
    strengthText.className = `strength-text ${strength}`;
    strengthText.textContent = strength.charAt(0).toUpperCase() + strength.slice(1);

    // Check password match if confirm password has value
    if (signupConfirmPassword.value) {
        checkPasswordMatch();
    }
});

// Password Match Checker
const checkPasswordMatch = () => {
    const password = signupPassword.value;
    const confirmPassword = signupConfirmPassword.value;

    if (confirmPassword.length === 0) {
        passwordMatch.textContent = '';
        passwordMatch.className = 'password-match';
        return;
    }

    if (password === confirmPassword) {
        passwordMatch.textContent = 'Passwords match';
        passwordMatch.className = 'password-match match';
    } else {
        passwordMatch.textContent = 'Passwords do not match';
        passwordMatch.className = 'password-match no-match';
    }
};

signupConfirmPassword.addEventListener('input', checkPasswordMatch);

// Sign Up Form Submit
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = signupPassword.value;
    const confirmPassword = signupConfirmPassword.value;

    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Validate password strength
    const strength = checkPasswordStrength(password);
    if (strength === 'weak') {
        alert('Please choose a stronger password');
        return;
    }

    // Simulate account creation
    currentUser = {
        name: name,
        email: email
    };

    // Update success state
    document.getElementById('new-user-avatar').textContent = name.charAt(0).toUpperCase();
    document.getElementById('new-user-name').textContent = name;
    document.getElementById('new-user-email').textContent = email;

    // Show success state
    signupFormContainer.style.display = 'none';
    signupSuccess.style.display = 'block';
});

// Start Building Button
startBuildingBtn.addEventListener('click', () => {
    closeModal(signupModal);
    alert(`Welcome to Velocity, ${currentUser.name}! Your account has been created.`);
});

// =========================================
// Video Modal Logic
// =========================================
const videoModal = document.getElementById('video-modal');
const heroDemoBtn = document.getElementById('hero-demo-btn');
const videoClose = document.getElementById('video-close');

heroDemoBtn.addEventListener('click', () => {
    openModal(videoModal);
});

videoClose.addEventListener('click', () => closeModal(videoModal));
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeModal(videoModal);
});

// =========================================
// Escape Key Handler
// =========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal(signinModal);
        closeModal(signupModal);
        closeModal(videoModal);
    }
});

// =========================================
// Smooth Scroll
// =========================================
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
