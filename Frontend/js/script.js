function enableEdit() {
    const inputs = document.querySelectorAll("#profileForm input");
    inputs.forEach(input => {
        input.disabled = false;
    });
}

document.getElementById("profileForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Profile Updated Successfully!");
});