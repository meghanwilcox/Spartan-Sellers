const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');


const app = express();


const passport = require('passport');
const session = require('express-session');

app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true
  }));

app.use(passport.initialize());
app.use(passport.session());



app.use(cors());
app.use(bodyParser.json());

const authRoutes = require('./routes/userAuthRoutes');
const itemRoutes = require('./routes/itemDataRoutes');
const userRoutes = require('./routes/userDataRoutes');

app.use('/auth', authRoutes);
app.use('/item', itemRoutes);
app.use('/user', userRoutes);

app.get('/login', async (req, res) => {
   res.redirect('http://127.0.0.1:3001/public/login.html');
});

// Start the server
app.listen(3000, function() {
    console.log('SpartanSellers Server listening on port 3000!');
});

module.exports = app;

