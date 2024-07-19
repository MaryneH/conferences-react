import React, { useEffect, useState } from 'react';
import AdminUsers from '../Components/User/AdminUsers';
import axios from 'axios';

const AdminUsersPage = () => {
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
    return <p>Loading...</p>;
  }

  return (
    <div>
      {error ? <p style={{ color: 'red' }}>{error}</p> : <AdminUsers isAdmin={isAdmin} />}
    </div>
  );
};

export default AdminUsersPage;
