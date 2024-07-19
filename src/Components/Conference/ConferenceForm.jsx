import React, { useState, useEffect } from 'react';
import { createConference, updateConference, deleteConference } from '../../api/conferenceApi';
import './conferenceFormCss.css';

const ConferenceForm = ({ existingConference, onSave }) => {
  const [title, setTitle] = useState(existingConference ? existingConference.title : '');
  const [date, setDate] = useState(existingConference ? existingConference.date : '');
  const [description, setDescription] = useState(existingConference ? existingConference.description : '');
  const [img, setImg] = useState(existingConference ? existingConference.img : '');
  const [content, setContent] = useState(existingConference ? existingConference.content : '');
  const [duration, setDuration] = useState(existingConference ? existingConference.duration : '');
  const [addressl1, setAddressl1] = useState(existingConference ? existingConference.osMap.addressl1 : '');
  const [addressl2, setAddressl2] = useState(existingConference ? existingConference.osMap.addressl2 : '');
  const [postalCode, setPostalCode] = useState(existingConference ? existingConference.osMap.postalCode : '');
  const [city, setCity] = useState(existingConference ? existingConference.osMap.city : '');
  const [coordinates, setCoordinates] = useState(existingConference ? existingConference.osMap.coordinates.join(', ') : '');
  const [speakers, setSpeakers] = useState(existingConference ? existingConference.speakers : []);
  const [stakeholders, setStakeholders] = useState(existingConference ? existingConference.stakeholders : []);
  const [mainColor, setMainColor] = useState(existingConference ? existingConference.design.mainColor : '');
  const [secondColor, setSecondColor] = useState(existingConference ? existingConference.design.secondColor : '');

  const handleSubmit = async () => {
    const conference = {
      title,
      date,
      description,
      img,
      content,
      duration,
      osMap: {
        addressl1,
        addressl2,
        postalCode,
        city,
        coordinates: coordinates.split(', ').map(Number),
      },
      speakers,
      stakeholders,
      design: {
        mainColor,
        secondColor,
      },
    };

    try {
      if (existingConference) {
        await updateConference(existingConference.id, conference);
      } else {
        await createConference(conference);
      }
      onSave();
    } catch (error) {
      console.error('Error saving conference:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteConference(existingConference.id);
      onSave(); // or call another method to update the state
    } catch (error) {
      console.error('Error deleting conference:', error);
    }
  };

  const handleSpeakerChange = (index, field, value) => {
    const newSpeakers = [...speakers];
    newSpeakers[index] = { ...newSpeakers[index], [field]: value };
    setSpeakers(newSpeakers);
  };

  const addSpeaker = () => {
    setSpeakers([...speakers, { firstname: '', lastname: '' }]);
  };

  const removeSpeaker = (index) => {
    setSpeakers(speakers.filter((_, i) => i !== index));
  };

  const handleStakeholderChange = (index, field, value) => {
    const newStakeholders = [...stakeholders];
    newStakeholders[index] = { ...newStakeholders[index], [field]: value };
    setStakeholders(newStakeholders);
  };

  const addStakeholder = () => {
    setStakeholders([...stakeholders, { firstname: '', lastname: '', job: '', img: '' }]);
  };

  const removeStakeholder = (index) => {
    setStakeholders(stakeholders.filter((_, i) => i !== index));
  };

  return (
    <div className="conference-form-container">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Date"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="text"
        value={img}
        onChange={(e) => setImg(e.target.value)}
        placeholder="Image URL"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Contenu"
      />
      <input
        type="text"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Durée"
      />
      <h3>Adresse</h3>
      <input
        type="text"
        value={addressl1}
        onChange={(e) => setAddressl1(e.target.value)}
        placeholder="Adresse 1"
      />
      <input
        type="text"
        value={addressl2}
        onChange={(e) => setAddressl2(e.target.value)}
        placeholder="Adresse 2"
      />
      <input
        type="int"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        placeholder="Code postal"
      />
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Ville"
      />
      <input
        type="text"
        value={coordinates}
        onChange={(e) => setCoordinates(e.target.value)}
        placeholder="Coordonnées"
      />
      <h3>Conférencier(s)</h3>
      {speakers.map((speaker, index) => (
        <div key={index}>
          <input
            type="text"
            value={speaker.firstname}
            onChange={(e) => handleSpeakerChange(index, 'firstname', e.target.value)}
            placeholder="Prénom du conférencier"
          />
          <input
            type="text"
            value={speaker.lastname}
            onChange={(e) => handleSpeakerChange(index, 'lastname', e.target.value)}
            placeholder="Nom du conférencier"
          />
          <button onClick={() => removeSpeaker(index)}>Supprimer</button>
        </div>
      ))}
      <button onClick={addSpeaker}>Ajouter un conférencier</button>
      <h3>Intervenants</h3>
      {stakeholders.map((stakeholder, index) => (
        <div key={index}>
          <input
            type="text"
            value={stakeholder.firstname}
            onChange={(e) => handleStakeholderChange(index, 'firstname', e.target.value)}
            placeholder="Prénom de l'intervenant"
          />
          <input
            type="text"
            value={stakeholder.lastname}
            onChange={(e) => handleStakeholderChange(index, 'lastname', e.target.value)}
            placeholder="Nom de l'intervenant"
          />
          <input
            type="text"
            value={stakeholder.job}
            onChange={(e) => handleStakeholderChange(index, 'job', e.target.value)}
            placeholder="Travail de l'intervenant"
          />
          <input
            type="text"
            value={stakeholder.img}
            onChange={(e) => handleStakeholderChange(index, 'img', e.target.value)}
            placeholder="Image URL de l'intervenant"
          />
          <button onClick={() => removeStakeholder(index)}>Supprimer</button>
        </div>
      ))}
      <button onClick={addStakeholder}>Ajouter un intervenant</button>
      <h3>Details design</h3>
      <input
        type="text"
        value={mainColor}
        onChange={(e) => setMainColor(e.target.value)}
        placeholder="Coleur principale"
      />
      <input
        type="text"
        value={secondColor}
        onChange={(e) => setSecondColor(e.target.value)}
        placeholder="Seconde couleur"
      />
      <button onClick={handleSubmit}>
        Créer
      </button>
      {existingConference && (
        <div className="existing-conference-details">
          <h2>Conférence Existante</h2>
          <p>{existingConference.title}</p>
          <p>{existingConference.description}</p>
          <button onClick={handleDelete}>Supprimer</button>
        </div>
      )}
    </div>
  );
};

export default ConferenceForm;
