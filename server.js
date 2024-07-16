const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection setup
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Replace with your MySQL username
    password: '123456789',  // Replace with your MySQL password
    database: 'form_db'  // Replace with your MySQL database name
});

app.get('/',(req,res)=>{
    res.send("Working");
})
// Endpoint to handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Insert data into MySQL table
    connection.query(
        'INSERT INTO submissions (name, email, subject, message) VALUES (?, ?, ?, ?)',
        [name, email, subject, message],
        (error, results) => {
            if (error) {
                console.error('Error:', error);
                res.status(500).json({ success: false, message: 'Failed to store data.' });
            } else {
                res.json({ success: true, message: 'Data stored successfully.' });
            }
        }
    );
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
