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

app.get('/categories', async function (req, res) {
    try {
        let qry = 'SELECT categoryName FROM category;';
        let db = await getDBConnection();
        let categories = await db.all(qry);
        await db.close();
        console.log('Categories fetched successfully:', categories); // Log the fetched categories
        res.send(categories); // Send the categories as JSON response
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
    }
});


// Start the server
app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});