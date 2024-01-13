// RegisterComponent.js
import React, { useState } from 'react';
import api from '../../services/Api.service';

function RegisterComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    api.register({ username, password })
      .then(response => {
        // Handle successful registration
        console.log('Registration successful:', response.data);
      })
      .catch(error => {
        // Handle registration error
        console.error('Registration error:', error);
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <label>Username: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></label>
      <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default RegisterComponent;
