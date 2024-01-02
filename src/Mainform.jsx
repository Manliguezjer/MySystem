// Dashboard.js

import React from 'react';
import './styles/dashboard.css';

function Mainform() {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        {/* Sidebar content goes here */}
        <a href="#">Dashboard</a>
        {/* Add other sidebar links as needed */}
      </div>
      <div className="main-content">
        <h2>Bus Ticketing System Dashboard</h2>

        <div className="statistics-section">
          <div className="statistic-box revenue-box">
            <div className="statistic-heading">Total Revenue</div>
            <div className="statistic-value"> ₱ 5,000</div>
          </div>

          <div className="statistic-box reservations-box">
            <div className="statistic-heading">Total Reservations</div>
            <div className="statistic-value">50</div>
          </div>

          {/* Add other statistic boxes as needed */}
          {/* <div className="statistic-box other-statistic-box">
            <div className="statistic-heading">Other Statistic</div>
            <div className="statistic-value">Value</div>
          </div> */}
        </div>

        {/* Add other main content sections as needed */}
      </div>
    </div>
  );
}

export default Mainform;
