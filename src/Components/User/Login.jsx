import React, { useState } from 'react';
import axios from 'axios';
import './loginCss.css';

const Login = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.post('http://localhost:4555/login', {
        id: username,
        password,
      });
      const token = response.data;
      localStorage.setItem('authToken', token);
      setSuccess('Vous êtes connecté !');
      if (onSuccess) onSuccess();
    } catch (error) {
      setError('Identifiant ou mot de passe invalide');
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login-container">
      <h1>Connexion</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleLogin}>
        <label>
          Identifiant:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Mot de passe:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
