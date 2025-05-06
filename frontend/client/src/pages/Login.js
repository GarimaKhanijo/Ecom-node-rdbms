import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { Link } from 'react-router-dom';
import './styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/api/users/login', formData);
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Welcome Back</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
      </form>
    </div>
  );
};

export default Login;
