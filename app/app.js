const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
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

const getUserFromToken = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return user;
}

const verifyToken = (req, res, next) => {
    try {
        getUserFromToken(req);
        next();
    } catch(e) {
        res.send({ error: 'Invalid Token' });
    }
}
//Endpointas grąžina events informaciją pagal userId:
app.get('/events', verifyToken, (req, res) => {
    const user = getUserFromToken(req);
    
    connection.execute('SELECT * FROM events WHERE userId=?', [user.id], (err, events) => {
        //console.log(err);
        res.send(events);
    });
});

app.post('/events', verifyToken, (req, res) => {
    const { client_name, client_surname, client_email, phone_number, event_title } = req.body;
    const { id } = getUserFromToken(req);
    
    connection.execute(
        'INSERT INTO events (client_name, client_surname, client_email, phone_number, event_title, userId) VALUES (?, ?, ?, ?, ?, ?)',
        [client_name, client_surname, client_email, phone_number, event_title, id],
        () => {
            connection.execute(
                'SELECT * FROM events WHERE userId=?',
                [id],
                (err, events) => {
                    //console.log(err);
                    res.send(events);
                }
            )
        }
    )
});

app.post('/register', (req, res) => {
    const {first_name, last_name, email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 15);

    connection.execute(
        'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
        [first_name, last_name, email, hashedPassword],
        (err, result) => {
            if (err?.code === 'ER_DUP_ENTRY') {
                res.sendStatus(400);
            }
            //console.log(err);
            res.send(result);
        }
    )
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    connection.execute(
        'SELECT * FROM users WHERE email=?',
        [email],
        (err, result) => {
            if (result.length === 0) {
                //console.log(err);
                res.sendStatus(401);
            } else {
                //console.log(result)
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

app.get('/token/verify', (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        res.send(user);
    } catch(e) {
        res.send({ error: 'Invalid Token' });
    }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));