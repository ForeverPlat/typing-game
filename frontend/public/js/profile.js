document.querySelector('#profile-button').addEventListener("click", async () => {
    const token = localStorage.getItem('token');

    const res = await fetch('http://localhost:3000/api/profile', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const json = await res.json();
    console.log(json);

    if (!json.success) {
        window.location.href='../pages/auth.html';
        return;
    }

    window.location.href='../pages/profile.html';
});