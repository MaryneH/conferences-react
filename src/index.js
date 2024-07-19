// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import ConferenceDetailPage from './pages/ConferenceDetailPage';
import LoginPage from './pages/LoginPage';
import AdminConferencesPage from './pages/AdminConferencesPage';
import AdminUsersPage from './pages/AdminUsersPage';
import './index.css';
import Logout from './Components/User/Logout';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="conference/:id" element={<ConferenceDetailPage />} />
        <Route path="admin/conferences" element={<AdminConferencesPage />} />
        <Route path="admin/users" element={<AdminUsersPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="logout" element={<Logout />} />
      </Route>
    </Routes>
  </Router>
);