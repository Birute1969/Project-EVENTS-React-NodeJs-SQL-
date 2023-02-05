const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const e = require('cors');
const jwt = require('jsonwebtoken');

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

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split('')[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    } catch(e) {
        res.send('Invalid Token');
    }
}

app.get('/users', (req, res) => {
    connection.execute('SELECT * FROM users', (err, users) => {
        console.log(users);
        res.send(users);
    });
    
});

// app.get('/events', (req, res) => {
//     connection.execute('SELECT * FROM events', (err, events) => {
//         console.log(events);
//         res.send(events);
//     });
    
// });

app.get('/events', verifyToken, (req, res) => {
    const { userId } = req.query;
    connection.execute('SELECT * FROM events WHERE userId=?', [userId], (err, events) => {
        console.log(events);
        res.send(events);
    })
    
});

app.post('/register', (req, res) => {
    const {first_name, last_name, email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 15);

    connection.execute(
        'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
        [first_name, last_name, email,hashedPassword],
        (err, result) => {
            if (err?.code === 'ER_DUP_ENTRY') {
                res.sendStatus(400);
            }
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
                    const { id, email} = result[0];
                    const token = jwt.sign( {id, email}, process.env.JWT_SECRET_KEY);
                    res.send({token, id, email });
                } else {
                    res.sendStatus(401);
                }
            }
        }
    );
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));