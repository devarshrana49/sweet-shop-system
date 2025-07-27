import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      const response = await axios.post(`http://localhost:5000${endpoint}`, formData);

      // Save token to browser's local storage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user || { username: formData.username }));

      setMessage(response.data.message);
      onLogin(response.data.token);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', fontSize: '16px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', fontSize: '16px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', fontSize: '16px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        {isRegister ? 'Already have an account?' : "Don't have an account?"}
        <button 
          onClick={() => setIsRegister(!isRegister)}
          style={{ background: 'none', border: 'none', color: '#007bff', textDecoration: 'underline', marginLeft: '5px', cursor: 'pointer' }}
        >
          {isRegister ? 'Login' : 'Register'}
        </button>
      </p>
      {message && <p style={{ color: message.includes('success') ? 'green' : 'red', textAlign: 'center' }}>{message}</p>}
    </div>
  );
}

export default Login;