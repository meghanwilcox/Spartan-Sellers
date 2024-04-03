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
                'SELECT DISTINCT * FROM Flagged_Users;'
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

    async removeFlaggedUser(userData) {
        try {
            console.log("Attempting to remove flagged user: ", userData.userName);
    
            // Execute the DELETE query to remove the flagged user
            await this.db.run(
                'DELETE FROM Flagged_Users WHERE userName = ?;',
                [userData.userName]
            );
    
            // Check if any rows were affected by the DELETE operation
            const changes = this.db.get("SELECT changes() AS changes");
            if (changes.changes === 0) {
                console.log("No flagged user found for userName: ", userData.userName);
            }
    
            console.log("Flagged user removed successfully!");
            return; // No need to return anything
        } catch (error) {
            console.error('Error removing flagged user:', error);
            throw new Error('Failed to remove flagged user: ' + error.message);
        }
    }

    async removeUser(userData) {
        try {
            console.log("Attempting to remove user: ", userData.userName);
    
            // Execute the DELETE query to remove the user from both the user table and the flagged users table
            await this.db.run(
                'DELETE User, Flagged_Users FROM User LEFT JOIN Flagged_Users ON User.userName = Flagged_Users.userName WHERE User.userName = ?;',
                [userData.userName]
            );
    
            // Check if any rows were affected by the DELETE operation
            const changes = this.db.get("SELECT changes() AS changes");
            if (changes.changes === 0) {
                console.log("No user found for userName: ", userData.userName);
            }
    
            console.log("User removed successfully!");
            return; // No need to return anything
        } catch (error) {
            console.error('Error removing user:', error);
            throw new Error('Failed to remove user: ' + error.message);
        }
    }
}

module.exports = UserDataController;

