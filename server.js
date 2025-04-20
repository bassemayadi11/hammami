const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Serve static files
app.use(express.static(path.join(__dirname, '../')));

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'materialcalculator'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database.');
});

// Routes
connection.connect();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "gypsobat" directory
app.use(express.static(path.join(__dirname, '../gypsobat')));

// Serve the login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../gypsobat/login.html'));
});

// Handle login form submission
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send('Missing email or password');
        return;
    }

    const query = 'SELECT * FROM user WHERE email = ? AND password = ?';
    connection.query(query, [email, password], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Server error');
            return;
        }

        if (results.length > 0) {
            res.redirect('/table1.html');
        } else {
            res.send('<script>alert("Invalid credentials"); window.location.href = "/";</script>');
        }
    });
});// Start server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});

