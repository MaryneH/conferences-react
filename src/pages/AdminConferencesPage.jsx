// src/pages/AdminConferencesPage.js
import React, { useEffect, useState } from 'react';
import AdminConferences from '../Components/Conference/AdminConferences';
import axios from 'axios';
import './adminConferencesPageCss.css';

const AdminConferencesPage = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const response = await axios.get('http://localhost:4555/isAdmin', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setIsAdmin(response.data.isAdmin);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        setError('Error checking admin status');
        console.error('Error checking admin status:', err);
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, []);

  if (isAdmin === null) {
    return <p className="loading">Loading...</p>;
  }

  if (!isAdmin) {
    return <p className="access-denied">Vous n'avez pas les droits d'accès à cette page</p>;
  }

  return (
    <div className="page-container">
      {error ? <p style={{ color: 'red' }}>{error}</p> : <AdminConferences />}
    </div>
  );
};

export default AdminConferencesPage;
