import React, { useEffect, useState } from 'react';
import { getAllUsers, promoteUser, deleteUser, addUser, addAdmin } from '../../api/userApi';
import './adminUsers.css';

const AdminUsers = ({ isAdmin }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({ id: '', password: '' });
  const [formError, setFormError] = useState(null);
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      const fetchUsers = async () => {
        try {
          const data = await getAllUsers();
          setUsers(data);
        } catch (error) {
          setError('Error fetching users');
          console.error('Error fetching users:', error);
        }
      };

      fetchUsers();
    }
  }, [isAdmin]);

  const handlePromote = async (id) => {
    try {
      await promoteUser(id);
      setUsers(users.map(user => user.id === id ? { ...user, type: 'admin' } : user));
    } catch (error) {
      setError('Error promoting user');
      console.error('Error promoting user:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      setError('Error deleting user');
      console.error('Error deleting user:', error);
    }
  };

  const handleAddUser = async (event) => {
    event.preventDefault();
    setFormError(null);
    try {
      if (!newUser.id || !newUser.password) {
        setFormError('Tous les champs sont obligatoires');
        return;
      }

      if (isAdminMode) {
        await addAdmin(newUser);
      } else {
        await addUser(newUser);
      }
      
      setNewUser({ id: '', password: '' });
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      setFormError('Error adding user');
      console.error('Error adding user:', error);
    }
  };

  if (!isAdmin) {
    return <p className="access-denied">Vous n'avez pas les droits d'accès à cette page</p>;
  }

  return (
    <div className="admin-users">
      <h1>Gestion des utilisateurs</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="add-user-form">
        <h2>{isAdminMode ? 'Ajouter un nouvel administrateur' : 'Ajouter un nouvel utilisateur'}</h2>
        {formError && <p className="form-error">{formError}</p>}
        <form onSubmit={handleAddUser}>
          <label>
            Identifiant:
            <input
              type="text"
              value={newUser.id}
              onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}
              required
            />
          </label>
          <label>
            Mot de passe:
            <input
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              required
            />
          </label>
          <button type="submit">Ajouter {isAdminMode ? 'Administrateur' : 'Utilisateur'}</button>
        </form>
        <button
          onClick={() => setIsAdminMode(!isAdminMode)}
          style={{ marginTop: '15px', backgroundColor: '#17a2b8', border: 'none' }}
        >
          {isAdminMode ? 'Passer en mode ajout utilisateur' : 'Passer en mode ajout administrateur'}
        </button>
      </div>
      <div>
        {users.length === 0 ? (
          <p>Aucun utilisateur disponible</p>
        ) : (
          users.map(user => (
            <div className="user-card" key={user.id}>
              <h2>{user.id}</h2>
              <p>{user.type === 'user' ? 'Utilisateur' : user.type === 'admin' ? 'Administrateur' : user.type}</p>
              {user.type !== 'admin' && (
                <button onClick={() => handlePromote(user.id)}>Changer les droits en administrateur</button>
              )}
              <button onClick={() => handleDelete(user.id)}>Supprimer</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
