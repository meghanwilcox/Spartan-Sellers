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

    // Define a route to search for products by keywords
    router.get('/search', async (req, res) => {
        try {
            const { keywords } = req.query;

            if (!keywords) {
                return res.status(400).json({ error: 'Keywords are required for search' });
            }

            const items = await itemDataController.searchforItems(keywords);
            res.json(items);
        } catch (error) {
            console.error('Error searching for products:', error);
            res.status(500).json({ error: 'Failed to search for products' });
        }
    });

    //Define a route to retreive the list of all items
    router.get('/get-all-items', async (req, res) => {
        try {
            const items = await itemDataController.getAllItems();
            res.status(200).json(items);
        } catch(error) {
            console.error('Error retreiving all items: ', error);
            res.status(500).json({error: 'Failed to retreive all items'});
        }
    });

    //defines a route to create a new item
    router.post('/create-new-listing', async (req, res) => {
        try {
            const itemData = req.body;
            const newItem = await itemDataController.createItemListing(itemData);
            res.status(201).json(newItem);
        } catch (error) {
            console.error('Error creating new item: ', error);
            res.status(500).json({ error: 'Failed to create new item' });
        }
    });

})();

module.exports = router;