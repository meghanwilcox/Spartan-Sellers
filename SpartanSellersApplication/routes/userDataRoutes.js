// This file contains the routes for user data operations
const express = require('express');
const router = express.Router();
const UserDataController = require('../controllers/user_data_controller');

const userDataController = new UserDataController();

// Define a route to retrieve the list of flagged users
router.get('user/get-flagged-users', async (req, res) => {
    try {
        const flaggedUsers = await userDataController.getFlaggedUsers();
        res.status(200).json(flaggedUsers); // Changed status code to 200 for successful retrieval
    } catch (error) {
        console.error('Error retrieving flagged users:', error);
        res.status(500).json({ error: 'Failed to retrieve flagged users' });
    }
});

// Define a route to remove a flagged user
router.delete('user/remove-flagged-user', async (req, res) => {
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

module.exports = router;