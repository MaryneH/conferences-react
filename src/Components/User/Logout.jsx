import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('authToken');

    navigate('/');
  }, [navigate]);

  return (
    <div>
      <p>Déconnexion en cours...</p>
    </div>
  );
};

export default Logout;
