import axios from 'axios';

const API_URL = 'http://localhost:4555/user';

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Fonction pour vérifier le statut d'administrateur
const checkAdminStatus = async () => {
  try {
    if (getAuthToken()) {
      const response = await axios.get('http://localhost:4555/isAdmin', {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`
        }
      });
      return response.data.isAdmin;
    }
    return false;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

// Fonction pour obtenir tous les utilisateurs
export const getAllUsers = async () => {
  try {
    if (!getAuthToken()) {
      throw new Error('No token found');
    }

    // Vérifiez si l'utilisateur est un admin
    const isAdmin = await checkAdminStatus();

    if (!isAdmin) {
      throw new Error('Access denied: not an admin');
    }

    const response = await axios.get('http://localhost:4555/users', {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Fonction pour promouvoir un utilisateur
export const promoteUser = async (id) => {
  try {
    const isAdmin = await checkAdminStatus();
    if (!isAdmin) throw new Error('Unauthorized');

    if (!getAuthToken()) {
      throw new Error('No token found');
    }

    // Utilisation correcte des backticks pour l'URL
    const url = `http://localhost:4555/usertype/${id}`;

    const response = await axios.patch(url, {
      newType: 'admin',
    }, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error promoting user:', error.response ? error.response.data : error.message);
    throw error;
  }
};


// Fonction pour supprimer un utilisateur
export const deleteUser = async (id) => {
  try {
    const isAdmin = await checkAdminStatus();
    if (!isAdmin) throw new Error('Unauthorized');
    
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Fonction pour ajouter un utilisateur
export const addUser = async (user) => {
  try {
    if (!getAuthToken()) {
      throw new Error('No token found');
    }

    const response = await axios.post('http://localhost:4555/signup', {
      id: user.id,
      password: user.password,
    }, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

// Fonction pour ajouter un administrateur
export const addAdmin = async (user) => {
  try {
    if (!getAuthToken()) {
      throw new Error('No token found');
    }

    const response = await axios.post('http://localhost:4555/signupadmin', {
      id: user.id,
      password: user.password,
    }, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding admin:', error);
    throw error;
  }
};
