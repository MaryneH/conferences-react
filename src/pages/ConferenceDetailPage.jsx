import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './conferenceDetailCss.css';

const ConferenceDetailPage = () => {
  const { id } = useParams();
  const [conference, setConference] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConference = async () => {
      try {
        const response = await axios.get(`http://localhost:4555/conference/${id}`);
        setConference(response.data);
      } catch (err) {
        setError('Error fetching conference details');
        console.error('Error fetching conference details:', err);
      }
    };

    fetchConference();
  }, [id]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!conference) return <p>Loading...</p>;

  return (
    <div className="conference-detail">
      <h1>{conference.title}</h1>
      <img src={conference.img} alt={conference.title} className="conference-detail-image" />
      <p>Date: {conference.date}</p>
      <p>Description: {conference.description}</p>
      <p>Contenu: {conference.content}</p>
      <div className="conference-speakers">
        <h3>Intervenants</h3>
        {conference.speakers.map((speaker, index) => (
          <div key={index} className="speaker">
            <p>{speaker.firstname} {speaker.lastname}</p>
          </div>
        ))}
      </div>
      <div className="conference-stakeholders">
        <h3>Parties Prenantes</h3>
        {conference.stakeholders.map((stakeholder, index) => (
          <div key={index} className="stakeholder">
            <p>{stakeholder.firstname} {stakeholder.lastname}</p>
            <p>{stakeholder.job}</p>
            {stakeholder.img && <img src={stakeholder.img} alt={stakeholder.firstname} className="stakeholder-image" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConferenceDetailPage;
