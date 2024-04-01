//this file contains the routes for user authentication
const express = require('express');
const router = express.Router();
const UserAuthController = require('../controllers/user_auth_controller');

const userAuthController = new UserAuthController();

router.post('auth/register', async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await userAuthController.registerNewUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error registering new user: ', error);
        res.status(500).json({ error: 'Failed to register new user' });
    }
});

module.exports = router;