import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './homeCss.css';

const Home = () => {
  const [conferences, setConferences] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const response = await axios.get('http://localhost:4555/conferences');
        setConferences(response.data);
      } catch (err) {
        setError('Error fetching conferences');
        console.error('Error fetching conferences:', err);
      }
    };

    fetchConferences();
  }, []);

  return (
    <div>
      <h1>Toutes les Conférences</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {conferences.length === 0 ? (
        <p>Aucune conférence disponible</p>
      ) : (
        <div className="conference-list">
          {conferences.map((conference) => (
            <div className="conference-card" key={conference.id}>
              <h2>{conference.title}</h2>
              <p>{conference.date}</p>
              <p>{conference.description}</p>
              <img src={conference.img} alt={conference.title} className="conference-image" />
              <Link to={`/conference/${conference.id}`}>
                <button>Détails</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
