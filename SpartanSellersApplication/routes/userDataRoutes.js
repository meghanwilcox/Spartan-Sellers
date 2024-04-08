// This file contains the routes for user data operations
const express = require('express');
const router = express.Router();
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

const UserDataController = require('../controllers/user_data_controller');

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
    const userDataController = new UserDataController(db);

    // Define a route to retrieve the list of flagged users
    router.get('/get-flagged-users', async (req, res) => {
        try {
            const flaggedUsers = await userDataController.getFlaggedUsers();
            res.status(200).json(flaggedUsers); 
        } catch (error) {
            console.error('Error retrieving flagged users:', error);
            res.status(500).json({ error: 'Failed to retrieve flagged users' });
        }
    });

    // Define a route to remove a flagged user
    router.delete('/remove-flagged-user', async (req, res) => {
        try {
            const userData = req.body; // Assuming the username is sent in the request body

            // Call the removeFlaggedUser method from the UserDataController to remove the flagged user
            await userDataController.removeFlaggedUser(userData);

            // Respond with a success message
            res.status(200).json({ message: 'Flagged user removed successfully' });
        } catch (error) {
            console.error('Error removing flagged user:', error);
            res.status(500).json({ error: 'Failed to remove flagged user' });
        }
    });

    // Define a route to remove a  user
    router.delete('/remove-user', async (req, res) => {
        try {
            const userData = req.body; // Assuming the username is sent in the request body

            // Call the removeFlaggedUser method from the UserDataController to remove the flagged user
            await userDataController.removeUser(userData);

            // Respond with a success message
            res.status(200).json({ message: 'User removed successfully' });
        } catch (error) {
            console.error('Error removing user:', error);
            res.status(500).json({ error: 'Failed to remove user' });
        }
    });
        
})();

module.exports = router;