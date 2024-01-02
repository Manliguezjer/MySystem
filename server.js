import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import cors from 'cors'; // Import cors

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ticketing',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  pool.query('SELECT * FROM account WHERE username = ? AND password = ?', [username, password], (error, results) => {
    if (error) {
      console.error('Error executing query:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        res.json({ success: true });
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    }
  });
});

app.get('/ticket-info', (req, res) => {
  pool.query(
    'SELECT `ticket id`, `Name`, `Address`, `Contact Number`, `Status`, `Ticket Date`, `Time` FROM `ticket information`',
    (error, results) => {
      if (error) {
        console.error('Error executing query:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    }
  );
});
app.get('/ticket-info/search', (req, res) => {
  const searchTerm = req.query.search || '';
  pool.query(
    'SELECT `ticket id`, `Name`, `Address`, `Contact Number`, `Status`, `Ticket Date`, `Time` FROM `ticket information` WHERE `Name` LIKE ?',
    [`%${searchTerm}%`],
    (error, results) => {
      if (error) {
        console.error('Error executing query:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    }
  );
});
app.post('/ticket-info', (req, res) => {
  const {
    name,
    address,
    contactNumber,
    status,
    ticketDate,
    time,
    qrCode,
    qrCodeImage, // Add qrCodeImage to the request body
  } = req.body;

  const sql = 'INSERT INTO `ticket information` (`Name`, `Address`, `Contact Number`, `Status`, `Ticket Date`, `Time`, `QR Code`, `QR Code Image`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  pool.query(sql, [name, address, contactNumber, status, ticketDate, time, qrCode, qrCodeImage], (error) => {
    if (error) {
      console.error('Error executing query:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Ticket information and QR code saved successfully!');
      res.status(200).json({ success: true });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
