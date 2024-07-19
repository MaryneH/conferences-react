import React, { useEffect, useState } from 'react';
import { getAllConferences, deleteConference } from '../../api/conferenceApi';
import ConferenceForm from './ConferenceForm';
import './adminConferencesCss.css';

const AdminConferences = () => {
  const [conferences, setConferences] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const data = await getAllConferences();
        setConferences(data);
      } catch (error) {
        setError('Error fetching conferences');
        console.error('Error fetching conferences:', error);
      }
    };

    fetchConferences();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteConference(id);
      setConferences(conferences.filter(conference => conference.id !== id));
    } catch (error) {
      setError('Error deleting conference');
      console.error('Error deleting conference:', error);
    }
  };

  const handleSave = () => {
    const fetchConferences = async () => {
      try {
        const data = await getAllConferences();
        setConferences(data);
      } catch (error) {
        setError('Error fetching conferences');
        console.error('Error fetching conferences:', error);
      }
    };

    fetchConferences();
  };

  return (
    <div className="admin-conferences">
      <h1>Gestion des conférences</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ConferenceForm onSave={handleSave} />
      <div>
        {conferences.length === 0 ? (
          <p>Aucune conférence disponible</p>
        ) : (
          conferences.map(conference => (
            <div className="conference-card" key={conference.id}>
              <h2>{conference.title}</h2>
              <button onClick={() => handleDelete(conference.id)}>Supprimer</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminConferences;
