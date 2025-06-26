document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem('token');

    const res = await fetch('http://localhost:3000/api/profile', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await res.json();
    console.log(data);

    if (!data.success) {
        window.location.href='../pages/auth.html';
        return;
    }

    document.getElementById("username").textContent = data.user.username;
});
