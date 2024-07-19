import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../Components/User/Login';
import './loginPageCss.css';

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifiez la présence du token d'authentification dans le localStorage
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    navigate('/'); 
  };

  return (
    <div className="login-page">
      {isLoggedIn ? (
        <strong>Vous êtes connecté :)</strong>
      ) : (
        <Login onSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default LoginPage;
