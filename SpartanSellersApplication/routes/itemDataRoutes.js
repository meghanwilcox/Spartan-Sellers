//this file contains the routes for item data operations
const express = require('express');
const router = express.Router();
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

const ItemDataController = require('../controllers/item_data_controller');

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
    const itemDataController = new ItemDataController(db);

    //Define a route to retreive the list of items to be approved
    router.get('/get-items-to-be-approved', async (req, res) => {
        try {
            const itemsToBeApproved = await itemDataController.getItemsToBeApproved();
            res.status(200).json(itemsToBeApproved);
        } catch(error) {
            console.error('Error retreiving items to be approved: ', error);
            res.status(500).json({error: 'Failed to retreive items to be approved'});
        }
    });

    // Define a route to update the approval status of an item
    router.put('/approve-item/', async (req, res) => {
        try {
            const itemData = req.body;
            const result = await itemDataController.approveItem(itemData);
            res.status(200).json({ message: 'Item approved successfully', affectedRows: result });
        } catch (error) {
            console.error('Error approving item:', error);
            res.status(500).json({ error: 'Failed to approve item' });
        }
    });

    // Define a route to refuse an item
    router.delete('/refuse-item', async (req, res) => {
        try {
            const itemData = req.body; 
            await itemDataController.refuseItem(itemData);

            // Respond with a success message
            res.status(200).json({ message: 'Item removed successfully' });
        } catch (error) {
            console.error('Error removing item:', error);
            res.status(500).json({ error: 'Failed to remove item' });
        }
    });

    // Define a route to refuse an item
    router.delete('/remove-users-items', async (req, res) => {
        try {
            const itemData = req.body; 
            await itemDataController.removeUsersItems(itemData);

            // Respond with a success message
            res.status(200).json({ message: 'Items removed successfully' });
        } catch (error) {
            console.error('Error removing items:', error);
            res.status(500).json({ error: 'Failed to remove items' });
        }
    });

    
})();

module.exports = router;