// UserForm.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './UserForm.css';

export default function UserForm({ active }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Here you would typically send a POST request to register or log in the user
      const response = await axios.post('http://localhost:3000/users', {
        email,
        password,
      });
      setSuccess('Login successful!');
      console.log('User logged in:', response.data);
      setEmail('');
      setPassword('');
      setError('');
    } catch (err) {
      setError('Error logging in. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <form className={`user-form ${active ? 'active' : ''}`} onSubmit={handleSubmit}>
      <h3>Login Now</h3>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <div className="box">
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="box">
        <input
          type="password"
          placeholder="Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <p>
        Forgot your password?
        <a href="/">Click here</a>
      </p>
      <p>
        Don&apos;t have an account?
        <a href="/">Create now</a>
      </p>
      <button type="submit" className="btn">
        Login Now
      </button>
    </form>
  );
}

UserForm.propTypes = {
  active: PropTypes.bool.isRequired,
};
