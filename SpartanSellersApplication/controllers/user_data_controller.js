//this is the userDataController class, containing the methods for user operations
class UserDataController {
    constructor(db) {
        this.db = db;
    }

    // This function retrieves the list of flagged users
    async getFlaggedUsers() {
        try {
            console.log('Attempting to fetch flagged users.');

            // Get the flagged users from the database
            const flaggedUsers = await this.db.all(
                'SELECT * FROM Flagged_Users;'
            );

            if (!flaggedUsers || flaggedUsers.length === 0) {
                console.log('No flagged users found.');
                return []; // Return an empty array if no flagged users are found
            }

            console.log('Flagged users retrieved successfully:', flaggedUsers);
            return flaggedUsers;
            
        } catch (error) {
            console.error('Error getting flagged users: ', error);
            throw new Error('Failed to get flagged users: ' + error.message);
        }
    }
}

module.exports = UserDataController;
//remove flagged user
//remove users

