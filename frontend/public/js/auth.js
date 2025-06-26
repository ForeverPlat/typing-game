const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
// const signupBtn = document.getElementById("signup-button");
// const loginBtn = document.getElementById("login-button");

//  sign up

const signup = async (e) => {
    e.preventDefault();

    const username = signupForm.querySelector('input[type="text"]').value;
    const email = signupForm.querySelector('input[type="email"]').value;

    const passwords = signupForm.querySelectorAll('input[type="password"]');
    const password = passwords[0]?.value;
    const confirmPassword = passwords[1]?.value;

    console.log(password)

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

    // make a callback to open the profile page
    // window.location.href='../index.html';
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

    localStorage.setItem('token', data.data.token);
}

loginForm.addEventListener('submit', login);
signupForm.addEventListener('submit', signup);