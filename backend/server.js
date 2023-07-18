const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'signup',
});

// Handle user signup request
app.post('/signup', (req, res) => {
  const sql = 'INSERT INTO logins (name, email, password) VALUES (?, ?, ?)';
  const values = [req.body.name, req.body.email, req.body.password];

  console.log(values); // Log the values for debugging purposes

  // Execute the SQL query with the provided values
  db.query(sql, values, (err, data) => {
    if (err) {
      console.log(err); // Log any error that occurred
      return res.json('Error'); // Return an error response
    }
    return res.json(data); // Return the result data as a JSON response
  });
});

// Handle user login request
app.post('/login', (req, res) => {
  const sql = 'SELECT * FROM logins WHERE email = ? AND password = ?';
  const values = [req.body.email, req.body.password];

  // Execute the SQL query with the provided values
  db.query(sql, values, (err, data) => {
    if (err) {
      console.log(err); // Log any error that occurred
      return res.json('Error'); // Return an error response
    }
    if (data.length === 0) {
      // No matching user found
      return res.json('Invalid credentials'); // Return an 'Invalid credentials' response
    } else {
      // User found, return user data
      const user = data[0];
      return res.json(user); // Return the user data as a JSON response
    }
  });
});

// Start the server and listen on port 8081
app.listen(8081, () => {
  console.log('listening');
});
