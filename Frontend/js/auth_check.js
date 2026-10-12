document.addEventListener('DOMContentLoaded', () => {
    // 1. Grab the user data from storage
    const userData = localStorage.getItem('user');
    const welcomeText = document.getElementById('userWelcomeText');

    if (userData && welcomeText) {
        // 2. Parse the string into an object
        const user = JSON.parse(userData);

        // 3. Update the text to "Hi, [Name]"
        // We use user.name because that's what you saved during login
        welcomeText.textContent = `Hi, ${user.name}`;
    }
});

// Optional: Handle the Logout button click
document.querySelector('.logout-btn').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
});