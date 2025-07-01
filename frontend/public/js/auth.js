const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
// const signupBtn = document.getElementById("signup-button");
// const loginBtn = document.getElementById("login-button");

const delay = ms => new Promise(res => setTimeout(res, ms));

//  sign up

const signup = async (e) => {
    e.preventDefault();

    const username = signupForm.querySelector('input[type="text"]').value;
    const email = signupForm.querySelector('input[type="email"]').value;

    const passwords = signupForm.querySelectorAll('input[type="password"]');
    const password = passwords[0]?.value;
    const confirmPassword = passwords[1]?.value;

    if (password !== confirmPassword) {
        console.log("Passwords do not match.");
        return;
    }

    const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    console.log(data);

    const signupMsg = document.getElementById('signup-msg');

    if (!data.success) {
        signupMsg.style.color = '#db6c6c';
        signupMsg.textContent = data.msg;
        await delay(3000);
        return signupMsg.style.display = 'none';
    }

    signupMsg.style.color = '#70c470';
    signupMsg.textContent = 'Verification email sent.'
    await delay(3000);
    signupMsg.style.display = 'none'; 

    // localStorage.setItem('token', data.data.token);
    // window.location.href='../pages/profile.html';

}

// login
const login = async (e) => {
    e.preventDefault();
    
    const username = loginForm.querySelector("input[type='text']").value;
    const password = loginForm.querySelector("input[type='password']").value;

    const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    console.log(data);

    const loginMsg = document.getElementById('login-msg');

    if (!data.success) {
        loginMsg.style.color = '#db6c6c';
        loginMsg.textContent = data.msg;
        await delay(3000);
        return loginMsg.style.display = 'none';
    }

    localStorage.setItem('token', data.data.token);
    window.location.href='../pages/profile.html';
}

if (loginForm) {
    loginForm.addEventListener('submit', login);
}
if (signupForm) {
    signupForm.addEventListener('submit', signup);
}