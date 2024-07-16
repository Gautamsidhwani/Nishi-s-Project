const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 123456789,  // Replace with your MySQL password
    database: 'form_db',
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL...');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email_address, subject, message } = req.body;
    let sql = 'INSERT INTO submissions (name, email, subject, message) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email_address, subject, message], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Failed to submit form');
            return;
        }
        res.sendStatus(200); // Send back a success response
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
