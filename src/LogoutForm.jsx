// LogoutForm.js

import React from 'react';
import './styles/logout.css';

function LogoutForm({ onLogout }) {
  const handleLogout = () => {
    // Perform logout actions, e.g., clearing user session
    // ...

    // Call the onLogout callback if provided
    if (typeof onLogout === 'function') {
      onLogout();
    }
  };

  return (
    <div className="logout-container">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default LogoutForm;
