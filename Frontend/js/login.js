const loginForm = document.getElementById('loginForm');

// IMPORTANT 1: Use 'auth' because that's where your login route is in server.js
const API_BASE = 'http://localhost:5000/api/auth'; 

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // IMPORTANT 2: Save the token to "stay" logged in
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('authUser', JSON.stringify(data.user));

            alert("Success! Welcome to the Alumni Portal.");
            window.location.href = 'dashboard.html';
        } else {
            alert(data.message || "Invalid credentials");
        }
    } catch (error) {
        console.error("Connection Error:", error);
        alert("Server is offline. Did you run 'node server.js'?");
    }
});