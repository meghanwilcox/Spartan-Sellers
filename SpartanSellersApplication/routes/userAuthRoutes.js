//this file contains the routes for user authentication
const express = require('express');
const router = express.Router();
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

const UserAuthController = require('../controllers/user_auth_controller');

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

    //defines a route to register a new user
    router.post('/register', async (req, res) => {
        try {
            const userData = req.body;
            const newUser = await userAuthController.registerNewUser(userData);
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error registering new user: ', error);
            res.status(500).json({ error: 'Failed to register new user' });
        }
    });

    //defines a route to log in an existing user
    router.post('/login', async (req, res) => {
        try {
            const userData = req.body;
            const user = await userAuthController.loginUser(userData);
            res.status(200).json(user);
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(401).json({ error: 'Invalid username or password' });
        }
    });

    //defines a route to check if a user is an admin
    router.post('auth/isAdmin', async (req, res) => {
        try {
            const userData = req.body;
            const user = await userAuthController.isUserAdmin(userData);
            res.status(201).json(user);
        } catch (error) {
            console.error('Error checking if user is an admin: ', error);
            res.status(401).json({ error: 'Invalid user'});
        }
    });

    
})();

module.exports = router;
