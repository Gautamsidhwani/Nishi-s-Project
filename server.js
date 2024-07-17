const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const bodyParser = require('body-parser');




const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '123456789',  
    database: 'form_db'  
});

app.get('/',(req,res)=>{
    res.send("Working");
})

app.post('/submit-form', (req, res) => {
    const { name, email, subject, message } = req.body;
    connection.query(
        'INSERT INTO submissions (name, email, subject, message) VALUES (?, ?, ?, ?)',
        [name, email, subject, message],
        (error, results) => {
            if (error) {
                console.error('Error:', error);
                res.status(500).json({ success: false, message: 'Failed to store data.' });
            } else {
                res.redirect('/thank-you.html');
            }
        }
    );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
