//this is the itemDataController class, containging the methods for item operations
class ItemDataController{
    constructor(db) {
        this.db = db;
    }

    async getItemsToBeApproved() {
        try {
             console.log('Attempting to get items to be approved!');

             //get the items to be approved from the database
             const itemsToBeApproved = await this.db.all(
                'SELECT * FROM Item WHERE approval_status = 0;'
             );

             if(!itemsToBeApproved || itemsToBeApproved.length === 0) {
                console.log('No items found to be approved.');
                return [];
             }

             console.log('Items to be approved retreived successfully: ', itemsToBeApproved);
             return itemsToBeApproved;

        } catch(error) {
            console.error('Error getting items to be approved', error);
            throw new Error('Failed to get items to be approved: ' + error.message);
        }
    }

    async approveItem(itemData) {
        try {
            console.log('Attempting to approve item for itemID:', itemData.itemID);

            // Update the approval status of the item in the database
            const result = await this.db.run(
                'UPDATE Item SET approval_status = 1 WHERE itemID = ?',
                [itemData.itemID]
            );

            console.log('Item approved successfully:', result);
            return result.changes; // Return the number of affected rows
        } catch (error) {
            console.error('Error updating approval status:', error);
            throw new Error('Failed to update approval status: ' + error.message);
        }
    }

    async refuseItem(itemData) {
        try {
            console.log("Attempting to remove item: ", itemData.itemID);
    
            // Execute the DELETE query to remove the item
            await this.db.run(
                'DELETE FROM Item WHERE itemID = ?;',
                [itemData.itemID]
            );
    
            // Check if any rows were affected by the DELETE operation
            const changes = this.db.get("SELECT changes() AS changes");
            if (changes.changes === 0) {
                console.log("No item found for itemID: ", itemData.itemID);
            }
    
            console.log("Item removed successfully!");
            return; 
        } catch (error) {
            console.error('Error removing item:', error);
            throw new Error('Failed to remove item: ' + error.message);
        }
    }

    async removeUsersItems(itemData) {
        try {
            console.log("Attempting to remove items for user: ", itemData.userName);
    
            // Execute the DELETE query to remove the items listed by a specific user
            await this.db.run(
                'DELETE FROM Item WHERE userName = ?;',
                [itemData.userName]
            );
    
            // Check if any rows were affected by the DELETE operation
            const changes = this.db.get("SELECT changes() AS changes");
            if (changes.changes === 0) {
                console.log("No items found for userName: ", itemData.userName);
            }
    
            console.log("Items removed successfully!");
            return; 
        } catch (error) {
            console.error('Error removing items:', error);
            throw new Error('Failed to remove items: ' + error.message);
        }
    }

    //this function searches for and returns all the products that have a name or description that matches the keywords
    async searchforItems(keywords) {
        try {
            // Construct the SQL query to search for products based on keywords
            const query = `
                SELECT * 
                FROM Item 
                WHERE itemName LIKE ? OR description LIKE ?
            `;

            // Execute the SQL query against the database
            const items = await this.db.all(query, [`%${keywords}%`, `%${keywords}%`]);

            return items;
        } catch (error) {
            console.error('Error searching for items:', error);
            throw new Error('Failed to search for items');
        }
    }

    //this function retrieves all the items frm the database
    async getAllItems() {
        try {
            console.log('Attempting to get all items!');

             //get the items from the database
             const items = await this.db.all(
                'SELECT * FROM Item;'
             );

             if(!items|| items.length === 0) {
                console.log('No items found.');
                return [];
             }

             console.log('Items retreived successfully: ', items);
             return items;


        } catch(error) {
            console.error('Error retrieving all items');
            throw new Error('Failed to get all items');
        }
    }

    async getItemsByCategory(category) {
        try {
            console.log('Attempting to fetch products in category:', category);
    
            // Query the database to get items by category
            const items = await this.db.all(
                'SELECT * FROM Item WHERE category = ?;',
                [category]
            );
    
            console.log('Products retrieved successfully:', items);
            return items;
        } catch (error) {
            console.error('Error getting products: ', error);
            throw new Error('Failed to get products: ' + error.message);
        }
    }

    //this function creates a new item in the database
    async createItemListing(itemData) {
        try {
            console.log('Attempting to create new listing:', itemData);
    
            // Insert a new item record into the database
            const result = await this.db.run(
                'INSERT INTO Item (userName, itemName, itemImg itemPrice, description, condition, category, approval_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [itemData.userName, itemData.itemName, itemData.itemImg, itemData.itemPrice, itemData.description, itemData.condition, itemData.category, itemData.approval_status]
            );
    
            console.log('New item created successfully:', result);
    
            // Return the newly registered user data
            return { id: result.lastID, ...itemData };
        } catch(error) {
            console.error('Error creating new listing.');
            throw new Error('Failed to create new listing:' + error.message);
        }
    }


}

module.exports = ItemDataController;