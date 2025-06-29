const token = localStorage.getItem('token');

const checkLoginStatus = async() => {
    if (!token) {
        return false;
    }

    const res = await fetch('http://localhost:3000/api/auth/verify', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await res.json();

    if (!data.success) {
        localStorage.removeItem('token');
        return false;
    }

    document.getElementById('logout-button').style.display = 'block';
    document.getElementById('logout-button').addEventListener('click', logout);

    return true;
}


const logout = async() => {

    if (await checkLoginStatus()) {
        localStorage.removeItem('token'); 
        window.location.href='../pages/auth.html';
    }

}

document.addEventListener('DOMContentLoaded', checkLoginStatus);