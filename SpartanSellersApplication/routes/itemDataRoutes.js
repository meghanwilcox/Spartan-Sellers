//this file contains the routes for item data operations
const express = require('express');
const router = express.Router();
const ItemDataController = require('../controllers/item_data_controller');

const itemDataController = new ItemDataController();

//Define a route to retreive the list of items to be approved
router.get('item/get-items-to-be-approved', async (req, res) => {
    try {
        const itemsToBeApproved = await itemDataController.getItemsToBeApproved();
        res.status(200).json(itemsToBeApproved);
    } catch(error) {
        console.error('Error retreiving items to be approved: ', error);
        res.status(500).json({error: 'Failed to retreive items to be approved'});
    }
});

// Define a route to update the approval status of an item
router.put('item/approve-item/', async (req, res) => {
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
router.delete('item/refuse-item', async (req, res) => {
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
router.delete('item/remove-users-items', async (req, res) => {
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

module.exports = router;