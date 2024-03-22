const express = require('express');
const cors = require('cors'); // Import cors middleware
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

const app = express();

app.use(cors()); // Enable CORS

app.use(bodyParser.json());


async function getDBConnection() {
    const db = await sqlite.open({
    filename: 'data/spartanSellersDatabase.db',
    driver: sqlite3.Database
    });
    return db;
}


// Root endpoint
app.get('/', function(req, res) {
    res.send('Hello World!');
});


// Start the server
app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});