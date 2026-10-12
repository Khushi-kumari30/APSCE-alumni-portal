document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const profileForm = document.getElementById('profileForm');

    // 1. Pre-fill the email from the token/session so the server knows who is updating
    try {
        const response = await fetch('/api/users/profile-data', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const userData = await response.json();
        if (userData.email) {
            document.getElementById('displayEmail').value = userData.email;
        }
    } catch (err) {
        console.error("Could not fetch initial user data");
    }

    // 2. Handle the Form Submission
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(profileForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/users/update-profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                alert("Success: " + result.message);
            } else {
                alert("Error: " + result.message);
            }
        } catch (error) {
            console.error("Submit Error:", error);
            alert("Failed to save data to server.");
        }
    });
});