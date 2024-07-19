import React from 'react';
import { Link } from 'react-router-dom';
import './navbarCss.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item"><Link to="/">Accueil</Link></li>
        <li className="nav-item"><Link to="/admin/conferences">Gestion des conférences</Link></li>
        <li className="nav-item"><Link to="/admin/users">Gestion des utilisateurs</Link></li>
        <li className="nav-item"><Link to="/login">Se connecter</Link></li>
        <li className="nav-item"><Link to="/logout">Se déconnecter</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
