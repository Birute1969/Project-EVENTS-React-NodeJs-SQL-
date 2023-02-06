const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const fetch = require('node-fetch');

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
            res.sendStatus(200);
        }
    )
})

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

app.get('/events', verifyToken, (req, res) => {
    const user = getUserFromToken(req);
    
    connection.execute('SELECT * FROM events WHERE userId=?', [user.id], (err, events) => {
        res.send(events);
    });
});

app.post('/events', verifyToken, (req, res) => {
    const { client_name, client_surname, client_email, phone_number, event_title, timestamp } = req.body;
    const { id } = getUserFromToken(req);

    const sqlQuery = timestamp ?
    //jeigu atkeliauja user įrašyta data, bus taip
    'INSERT INTO events (client_name, client_surname, client_email, phone_number, event_title, userId, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)' :
    //jeigu user neįrašys datos, bus taip:
    'INSERT INTO events (client_name, client_surname, client_email, phone_number, event_title, userId) VALUES (?, ?, ?, ?, ?, ?)';

    //susikuriame kintamąjį dėl datos, jeigu nesuvestume svetainėje:
    const data = [client_name, client_surname, client_email, phone_number, event_title, id];
    if (timestamp) {
        data.push(timestamp);
    }

    connection.execute(
        sqlQuery,
        data,
        () => {
            connection.execute(
                //grąžiname visas atnaujintus user įrašus:
                'SELECT * FROM events WHERE userId=?', 
                [id], 
                (err, events) => { 
                    res.send(events);
                }
            )
        }
    )
});

app.delete('/events/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    //susirandame būtent to user įrašus ir ištriname:
    const { id: userId } = getUserFromToken(req);

    //console.log(user);
    //console.log(id);

    connection.execute(
        'DELETE FROM events WHERE id=? AND userId=?',
        [id, userId],
        () => {
            connection.execute(
                //grąžiname visas atnaujintus user įrašus po ištrynimo:
                'SELECT * FROM events WHERE userId=?', 
                [userId], 
                (err, events) => {
                    res.send(events);
                }
            )
        }
    )
});

app.post('/register', (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 12);

    connection.execute(
        'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?)', 
        [first_name, last_name, email, password, hashedPassword],
        (err, result) => {
            if (err?.code === 'ER_DUP_ENTRY') {
                res.sendStatus(400);
            }
            
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
                res.sendStatus(401);
            } else {
                const passwordHash = result[0].password
                const isPasswordCorrect = bcrypt.compareSync(password, passwordHash);
                if (isPasswordCorrect) {
                    const { id, email } = result[0];
                    const token = jwt.sign({ id, email }, process.env.JWT_SECRET_KEY);
                    res.send({ token, id, email });
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