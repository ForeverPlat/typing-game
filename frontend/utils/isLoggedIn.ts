import API_URL from '../src/config';

export const isLoggedIn = async () => {
    const logoutToken = localStorage.getItem('token');
    if(!logoutToken) return false;

    // make a verify user util, we can use that to j check logged in ig
    const res = await fetch(`${API_URL}/auth/verify-user`, {
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