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
const UserDataController = require('./controllers/user_data_controller');

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

    // Define the route for logging in a user
    app.post('/auth/login', async (req, res) => {
        try {
            const userData = req.body;
            // Call the appropriate method from UserAuthController to validate the user login
            const user = await userAuthController.loginUser(userData);
            // Return the user data or appropriate response based on validation result
            res.json(user);
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({ error: 'Failed to log in user' });
        }
    });

    //define the route for checking if a user is an admin
    app.post('/auth/isAdmin', async (req, res) => {
        try {
            const userData = req.body;
            const user = await userAuthController.isUserAdmin(userData);
            res.json(user);
        } catch (error){
            console.error('Error checking if user is admin: ', error);
            res.status(500).json({ error: 'Failed to check if user is admin'});
        }
    });

})();

//initialize the UserDataController with the database connection
(async () => {
    const db = await getDBConnection();
    const userDataController = new UserDataController(db);

    // Define a route to retrieve the list of flagged users
    app.get('/user/get-flagged-users', async (req, res) => {
        try {
            const flaggedUsers = await userDataController.getFlaggedUsers();
            res.json(flaggedUsers); 
        } catch (error) {
            console.error('Error retrieving flagged users:', error);
            res.status(500).json({ error: 'Failed to retrieve flagged users' });
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