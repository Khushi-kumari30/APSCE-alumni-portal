let slides = document.querySelectorAll(".slides");
let dots = document.querySelectorAll(".dots span");
let index = 0;

function showSlide(i) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[i].classList.add("active");
}

function setSlide(i) {
    index = i;
    showSlide(index);
}

function autoSlide() {
    index++;
    if (index >= slides.length) index = 0;
    showSlide(index);
}

setInterval(autoSlide, 4000);
document.addEventListener('DOMContentLoaded', () => {
    const userData = localStorage.getItem('user');
    
    if (userData) {
        const user = JSON.parse(userData);
        // Assuming you have an element with id="user-greeting"
        const greetingArea = document.getElementById('user-greeting');
        if (greetingArea) {
            greetingArea.innerHTML = `Hi, ${user.name} | <a href="#" onclick="logout()">Logout</a>`;
        }
    }
});

function logout() {
    localStorage.clear(); // Clears token and user data
    window.location.href = 'login.html';
}