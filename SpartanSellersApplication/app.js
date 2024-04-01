const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Import the UserAuthController
const UserAuthController = require('./controllers/user_auth_controller');

//getDBConnection: a function to establish a connection with the database
async function getDBConnection() {
    const db = await sqlite.open({
    filename: 'data/spartanSellersDatabase.db',
    driver: sqlite3.Database
    });
    return db;
}

// Initialize the UserAuthController with the database connection
(async () => {
    const db = await getDBConnection();
    const userAuthController = new UserAuthController(db);

    // Define the route for registering a new user
    app.post('/auth/register', async (req, res) => {
        try {
            const userData = req.body;
            const newUser = await userAuthController.registerNewUser(userData);
            res.json(newUser);
        } catch (error) {
            console.error('Error registering new user:', error);
            res.status(500).json({ error: 'Failed to register new user' });
        }
    });
})();

// Root endpoint
app.get('/', function(req, res) {
    res.send('Hello World!');
});

// Start the server
app.listen(3000, function() {
    console.log('SpartanSellers Server listening on port 3000!');
});