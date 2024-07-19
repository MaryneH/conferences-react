import axios from 'axios';

// Fonction pour vérifier le statut d'administrateur
export const checkIfAdmin = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get('http://localhost:4555/isAdmin', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.isAdmin;
  } catch (error) {
    console.error('Error checking admin status:', error);
    throw error;
  }
};

// Fonction pour obtenir tous les utilisateurs
export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No token found');
    }

    // Vérifiez si l'utilisateur est un admin
    const isAdmin = await checkIfAdmin();

    if (!isAdmin) {
      throw new Error('Access denied: not an admin');
    }

    const response = await axios.get('http://localhost:4555/users', {
      headers: {
        Authorization: `Bearer ${token}`,
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
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No token found');
      }
  
      const response = await axios.patch('http://localhost:4555/usertype', {
        id,
        newType: 'admin',
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Error promoting user:', error);
      throw error;
    }
};

// Fonction pour supprimer un utilisateur
export const deleteUser = async (id) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.delete(`http://localhost:4555/user`, {
      params: {
        id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.post('http://localhost:4555/signup', {
      id: user.id,
      password: user.password,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
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
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.post('http://localhost:4555/signupadmin', {
      id: user.id,
      password: user.password,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding admin:', error);
    throw error;
  }
};
