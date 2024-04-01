//this is the userAuthController class, containing the methods for user operations
class UserAuthController {
    constructor(db) {
        this.db = db;
    }

    async registerNewUser(userData) {
        try {
            console.log('Attempting to register new user:', userData);
    
            // Insert a new user record into the database
            const result = await this.db.run(
                'INSERT INTO User (userName, password, email, firstName, lastName, isAdmin) VALUES (?, ?, ?, ?, ?, ?)',
                [userData.userName, userData.password, userData.email, userData.firstName, userData.lastName, userData.isAdmin]
            );
    
            console.log('New user registered successfully:', result);
    
            // Return the newly registered user data
            return { id: result.lastID, ...userData };
        } catch (error) {
            console.error('Error registering new user: ', error);
            throw new Error('Failed to register new user: ' + error.message);
        }
    }
}

module.exports = UserAuthController;