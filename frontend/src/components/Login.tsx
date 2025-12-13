import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import type { LoginRespone } from '../types';
import API_URL from '../config';

const Login = () => {

  const [user, setUser] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const delayedMessage = (setter: React.Dispatch<React.SetStateAction<string>>, message: string) => {
    setter('');
    setTimeout(() => setter(message), 5000);
  };


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user.username || !user.password) {
      setError("All fields must be filled.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const result: LoginRespone = await res.json();

      if (res.ok) {
        delayedMessage(setSuccess, "Login successful!");
        setUser({ username: '', password: '' });
        localStorage.setItem('token', result.data.token);
        navigate('/profile')
      } else {
        delayedMessage(setError, result.error || "Invalid credentials.");
      }

    } catch (error) {
      delayedMessage(setError, "An error occurred. Please try again later.");
    }
  };


  return (
    <div className="auth-wrapper">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        <div className="auth-msg" style={{ color: error ? 'var(--red)' : 'green' }}>
          {error || success}
        </div>

        <input
          className="auth-input"
          type="username"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
          required
        />

        <input
          className="auth-input"
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />

        <button className="auth-button" type="submit">Login</button>

        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
