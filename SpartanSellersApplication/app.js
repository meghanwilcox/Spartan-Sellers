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
const ItemDataController = require('./controllers/item_data_controller');

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

    app.delete('/user/remove-flagged-user', async (req, res) => {
        try {
            const userData = req.body; // Assuming the username is sent in the request body

            // Call the removeFlaggedUser method from the UserDataController to remove the flagged user
            const affectedRows = await userDataController.removeFlaggedUser(userData);

            // Send a response indicating success and the number of affected rows
            res.status(200).json({ message: 'Flagged user removed successfully', affectedRows });
        } catch(error) {
            console.error('Error removing flagged user: ', error);
            res.status(500).json({ error: 'Failed to remove flagged user' });
        }
    });

    app.delete('/user/remove-user', async (req, res) => {
        try {
            const userData = req.body; // Assuming the username is sent in the request body

            // Call the removeFlaggedUser method from the UserDataController to remove the flagged user
            const affectedRows = await userDataController.removeUser(userData);

            // Send a response indicating success and the number of affected rows
            res.status(200).json({ message: 'User removed successfully', affectedRows });
        } catch(error) {
            console.error('Error removing user: ', error);
            res.status(500).json({ error: 'Failed to remove user' });
        }
    });

})();

//initialize the ItemDataController with the database connection
(async () => {
    const db = await getDBConnection();
    const itemDataController = new ItemDataController(db);

    // Define a route to retrieve the list of items to be approved
    app.get('/item/get-items-to-be-approved', async (req, res) => {
        try {
            const itemsToBeApproved = await itemDataController.getItemsToBeApproved();
            res.json(itemsToBeApproved); 
        } catch (error) {
            console.error('Error retrieving items to be approved:', error);
            res.status(500).json({ error: 'Failed to retrieve items to be approved' });
        }
    });  

    app.put('/item/approve-item', async (req, res) => {
        try {
            const itemData = req.body;
            const result = await itemDataController.approveItem(itemData);
            res.status(200).json({ message: 'Item approved successfully!'});
        } catch( error) {
            console.error('Error approving item: ', error);
            res.status(500).json({error: 'Failed to approve item'});
        }
    });

    app.delete('/item/refuse-item', async (req, res) => {
        try {
            const itemData = req.body; 
            const affectedRows = await itemDataController.refuseItem(itemData);

            // Send a response indicating success and the number of affected rows
            res.status(200).json({ message: 'Item removed successfully', affectedRows });
        } catch(error) {
            console.error('Error removing item: ', error);
            res.status(500).json({ error: 'Failed to remove item' });
        }
    });

    app.delete('/item/remove-users-items', async (req, res) => {
        try {
            const itemData = req.body; 
            const affectedRows = await itemDataController.removeUsersItems(itemData);

            // Send a response indicating success and the number of affected rows
            res.status(200).json({ message: 'Items removed successfully', affectedRows });
        } catch(error) {
            console.error('Error removing items: ', error);
            res.status(500).json({ error: 'Failed to remove items' });
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