const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const e = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const mysqlConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
};

const connection = mysql.createConnection(mysqlConfig);

app.get('/users', (req, res) => {
    connection.execute('SELECT * FROM users', (err, users) => {
        console.log(users);
        res.send(users);
    });
    
});

app.get('/events', (req, res) => {
    connection.execute('SELECT * FROM events', (err, events) => {
        console.log(events);
        res.send(events);
    });
    
});

app.post('/register', (req, res) => {
    const {first_name, last_name, email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 15);

    connection.execute(
        'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
        [first_name, last_name, email,hashedPassword],
        (err, result) => {
            console.log(err);
            res.send(result);
        }
    )
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    connection.execute(
        'SELECT * FROM users WHERE email=?',
        [email],
        (err, result) => {
            if (result.length === 0) {
                res.status(401);
            } else {
                console.log(result)
                const passwordHash = result[0].password
                const isPasswordCorrect = bcrypt.compareSync(password, passwordHash);
                if (isPasswordCorrect) {
                    res.send(result[0]);
                } else {
                    res.sendStatus(401);
                }
            }
        }
    );
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));