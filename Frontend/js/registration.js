const timerEl = document.getElementById('timer');
const resendBtn = document.getElementById('resendBtn');
const emailEl = document.getElementById('email');
const otpEl = document.getElementById('otp');
const passwordEl = document.getElementById('password');
const confirmEl = document.getElementById('confirm');
const strengthEl = document.getElementById('strength');

const API_BASE = 'http://localhost:5000/api/users';
let timerInterval;

async function sendOTP() {
    const email = emailEl.value.trim();
    if (!email) {
        alert('Please enter an email');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/send-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const data = await response.json();
        if (!response.ok) {
            alert(data.message || 'Failed to send OTP');
            return;
        }

        alert(data.message);
        startTimer();
    } catch (error) {
        console.error('sendOTP error:', error);
        alert('Unable to connect to backend. Start the backend server first.');
    }
}

function resendOTP() {
    sendOTP();
}

function startTimer() {
    let timeLeft = 30;
    clearInterval(timerInterval);
    resendBtn.disabled = true;

    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerEl.innerText = 'You can resend now.';
            resendBtn.disabled = false;
            return;
        }
        timerEl.innerText = `Resend in ${timeLeft}s`;
        timeLeft -= 1;
    }, 1000);
}

function checkStrength() {
    const pwd = passwordEl.value;
    if (pwd.length < 6) {
        strengthEl.innerText = 'Weak';
    } else if (/[A-Z]/.test(pwd) && /\d/.test(pwd) && /[@#$!]/.test(pwd)) {
        strengthEl.innerText = 'Strong';
    } else {
        strengthEl.innerText = 'Medium';
    }
}

async function verifyOTP() {
    if (passwordEl.value !== confirmEl.value) {
        alert('Passwords do not match');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: emailEl.value.trim(),
                otp: otpEl.value.trim(),
                password: passwordEl.value
            })
        });

        const data = await response.json();
        if (!response.ok) {
            alert(data.message || 'Registration failed');
            return;
        }

        alert('Registration Successful');
        window.location.href = 'login.html';
    } catch (error) {
        console.error('verifyOTP error:', error);
        alert('Unable to connect to backend. Start the backend server first.');
    }
}