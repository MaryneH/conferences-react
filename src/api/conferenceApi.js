// src/api/conferenceApi.js
import axios from 'axios';

// Définissez l'URL de l'API et le token d'autorisation
const API_URL = 'http://localhost:4555/conference';

// Fonction pour obtenir le token d'autorisation depuis le localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Fonction pour créer une conférence
export const createConference = async (conference) => {
  try {
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

// Fonction pour mettre à jour une conférence
export const updateConference = async (id, conference) => {
  try {
    const response = await axios.patch(`${API_URL}?id=${id}`, { conference }, {
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

// Fonction pour supprimer une conférence
export const deleteConference = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}?id=${id}`, {
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

// Fonction pour obtenir toutes les conférences
export const getAllConferences = async () => {
  try {
    const response = await axios.get('http://localhost:4555/conferences');
    return response.data;
  } catch (error) {
    console.error('Error fetching conferences:', error);
    throw error;
  }
};

// Fonction pour obtenir une conférence par ID
export const getConferenceById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:4555/conference/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching conference:', error);
    throw error;
  }
};
