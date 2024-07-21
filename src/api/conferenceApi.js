import axios from 'axios';

const API_URL = 'http://localhost:4555/conference';
const CONFERENCES_URL = 'http://localhost:4555/conferences';

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

// Créer une conférence
export const createConference = async (conference) => {
  try {
    const isAdmin = await checkAdminStatus();
    if (!isAdmin) throw new Error('Unauthorized');
    
    const response = await axios.post(API_URL, conference, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating conference:', error);
    throw error;
  }
};

// Mettre à jour une conférence
export const updateConference = async (id, conference) => {
  try {
    const isAdmin = await checkAdminStatus();
    if (!isAdmin) throw new Error('Unauthorized');
    
    const response = await axios.patch(`${API_URL}/${id}`, conference, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating conference:', error);
    throw error;
  }
};

// Supprimer une conférence
export const deleteConference = async (id) => {
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
    console.error('Error deleting conference:', error);
    throw error;
  }
};

// Récupérer toutes les conférences (pas besoin de token)
export const getAllConferences = async () => {
  try {
    const response = await axios.get(CONFERENCES_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching conferences:', error);
    throw error;
  }
};

// Récupérer une conférence par ID (pas besoin de token)
export const getConferenceById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching conference:', error);
    throw error;
  }
};
