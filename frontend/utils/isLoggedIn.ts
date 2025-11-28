const backendURL = 'http://localhost:3000';

export const isLoggedIn = async () => {
    const logoutToken = localStorage.getItem('token');
    if(!logoutToken) return false;

    // make a verify user util, we can use that to j check logged in ig
    const res = await fetch(`${backendURL}/api/auth/verify-user`, {
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
    return true
}