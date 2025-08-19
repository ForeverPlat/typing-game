const logoutToken = localStorage.getItem('token');
const { BACKEND_URL } = process.env;

const checkLoginStatus = async() => {
    if (!logoutToken) {
        return false;
    }

    const res = await fetch(`${BACKEND_URL}/api/auth/verify-user`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${logoutToken}`
        }
    });

    const data = await res.json();

    if (!data.success) {
        localStorage.removeItem('token');
        return false;
    }

    const logoutBtn = document.getElementById('logout-button');
    if (logoutBtn) {
        logoutBtn.style.display = 'block';
        logoutBtn.addEventListener('click', logout);
    }

    return true;
}


const logout = async() => {

    if (await checkLoginStatus()) {
        localStorage.removeItem('token'); 
        window.location.href='../index.html';
    }

}

document.addEventListener('DOMContentLoaded', checkLoginStatus);