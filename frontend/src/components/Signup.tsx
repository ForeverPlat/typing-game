import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

const Signup = () => {

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const delayedMessage = (setter: React.Dispatch<React.SetStateAction<string>>, message: string) => {
    setter('');
    setTimeout(() => setter(message), 5000);
  };


  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = user;

    if (!username || !email || !password || !confirmPassword) {
      setError("All fields must be filled.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const result = await res.json();

      if (res.ok) {
        delayedMessage(setSuccess, "Verification email sent.");
        setUser({ username: '', email: '', password: '', confirmPassword: '' });
      } else {
        delayedMessage(setError, result.error || "Failed to create user.");
      }
    } catch (err) {
      delayedMessage(setError, "An error occurred. Please try again later.");
    }
  };


  return (
    <div className="auth-wrapper">
      <form className="auth-form" onSubmit={handleSignUp}>
        <h2>Sign Up</h2>

        <div className="auth-msg" style={{ color: error ? 'var(--red)' : 'green' }}>
          {error || success}
        </div>

        <input
          className="auth-input"
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
          required
        />

        <input
          className="auth-input"
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
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

        <input
          className="auth-input"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={user.confirmPassword}
          onChange={handleChange}
          required
        />

        <button className="auth-button" type="submit">Sign Up</button>

        <p className="auth-footer">
          Have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
