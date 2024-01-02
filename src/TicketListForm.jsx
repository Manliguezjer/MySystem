// TicketListForm.js

import React from 'react';
import './styles/ticketList.css';

function TicketListForm() {
  const ticketData = [
    { id: 1, passenger: 'Arnel E. Mesido', seatNumber: 'A1', fare: '₱1,000' },
    { id: 2, passenger: 'Lester P. Ordiz', seatNumber: 'B2', fare: '₱1,000' },
    { id: 2, passenger: 'Ella C. Manliguez', seatNumber: 'B5', fare: '₱1,000'},
    { id: 2, passenger: 'Jeffrey P. Aneslagon', seatNumber: 'A6', fare: '₱1,500' },
    { id: 2, passenger: 'Ehenz T. Telen', seatNumber: 'A3', fare: '₱1,000' },
    { id: 2, passenger: 'Lea C. Alvarez', seatNumber: 'B4', fare: '₱1,500' },
    { id: 2, passenger: 'Elmer G. Bonote', seatNumber: 'A4', fare: '₱1,000'},
    { id: 2, passenger: 'Jurnix P. Gozon', seatNumber: 'B3', fare: '₱1,000' },
    
    // Add more ticket data as needed
  ];

  return (
    <div className="ticket-list-container">
      <h2>Ticket List</h2>
      <table className="ticket-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Passenger</th>
            <th>Seat Number</th>
            <th>Fare</th>
          </tr>
        </thead>
        <tbody>
          {ticketData.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.passenger}</td>
              <td>{ticket.seatNumber}</td>
              <td>{ticket.fare}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TicketListForm;
