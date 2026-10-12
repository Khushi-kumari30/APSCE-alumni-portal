const updateProfile = async () => {
    const token = localStorage.getItem('token');
    
    // Collect data from your HTML inputs
    const profileData = {
        first_name: document.getElementById('first_name').value,
        middle_name: document.getElementById('middle_name').value,
        last_name: document.getElementById('last_name').value,
        usn: document.getElementById('usn').value,
        branch: document.getElementById('branch').value,
        year_passed: document.getElementById('year_passed').value,
        designation: document.getElementById('designation').value,
        company: document.getElementById('company').value,
        location: document.getElementById('location').value,
        phone: document.getElementById('phone').value,
        whatsapp: document.getElementById('whatsapp').value,
        linkedin: document.getElementById('linkedin').value
    };

    const response = await fetch('http://localhost:5000/api/users/update-profile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Critical for verifyToken middleware
        },
        body: JSON.stringify(profileData)
    });

    const result = await response.json();
    if (result.success) {
        alert("Data saved in MySQL successfully!");
    } else {
        alert("Update failed: " + result.message);
    }
};