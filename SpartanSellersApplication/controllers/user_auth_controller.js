//this is the userAuthController class, containing the methods for user authentication operations
class UserAuthController {
    constructor(db) {
        this.db = db;
    }

    //this function regsiters a new user (default is that a user is NOT an admin)
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

    //this function logs a new user into the site with thier username and password
    async loginUser(userData) {
        try {
            console.log('Attempting to login user:', userData.userName);
            
            // Query the database to check if the user exists and the password matches
            const user = await this.db.get(
                'SELECT * FROM user WHERE userName = ? AND password = ?',
                [userData.userName, userData.password]
            );
    
            if (!user) {
                throw new Error('Invalid username or password');
            }
    
            console.log('User logged in successfully:', user);
            return user;
        } catch (error) {
            console.error('Error logging in user:', error);
            throw new Error('Failed to login user: ' + error.message);
        }
    }

    //this function checks to see if a user is an admin based on theri username and password
    async isUserAdmin (userData) {
        try {
            console.log("Attempting to validate admin user: ", userData.userName);

            //query the db to see if user is an admin
            const user = await this.db.get(
                'SELECT * FROM user WHERE userName = ? AND password = ?',
                [userData.userName, userData.password]
            );

            // Check if user exists and isAdmin is set to true (assuming 1 represents true for isAdmin)
            if (user.isAdmin === 1) {
                console.log("User is an admin:", user.userName);
                return true;
            } else {
                console.log("User is not an admin:", user.userName);
                return false;
            }
        } catch (error) {
            console.error('Error checking if user is an admin: ', error);
            throw new Error('Failed to check if user is admin: ' + error.message);
        }
    }

}

module.exports = UserAuthController;