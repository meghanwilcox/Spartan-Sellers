const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const authRoutes = require('./routes/userAuthRoutes');
const itemRoutes = require('./routes/itemDataRoutes');
const userRoutes = require('./routes/userDataRoutes');

app.use('/auth', authRoutes);
app.use('/item', itemRoutes);
app.use('/user', userRoutes);

// Start the server
app.listen(3000, function() {
    console.log('SpartanSellers Server listening on port 3000!');
});