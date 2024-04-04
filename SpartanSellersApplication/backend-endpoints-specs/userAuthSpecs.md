The following is a list of the endpoints in the itemDataController class, along with thier specifications for use: 

- /auth/register
    this endpoint adds a new user to the User table of the database. This POST endpoint must be provided a username, password, email, firstName, lastName, and isAdmin in the JSON body.

    An example call to this POST endpoint: http://localhost:3000/auth/register when provided with the following JSON body:
        {
            "userName": "testUser5",
            "password": "testPassword1!",
            "email": "test@uncg.edu",
            "firstName": "Test",
            "lastName": "Test",
            "isAdmin": 0
        }

    is as follows:

    Attempting to register new user: {
    userName: 'testUser5',
    password: 'testPassword1!',
    email: 'test@uncg.edu',
    firstName: 'Test',
    lastName: 'Test',
    isAdmin: 0
    }
    New user registered successfully: { stmt: Statement { stmt: undefined }, lastID:
    10, changes: 1 }

- /auth/login
    this endpoint logs a user into the site by confirming that thier username exists, and confirming that the username and password match. This is a POST endpoint, and must be provided a username and password in the JSON body. 

    An example call and response to this POST endpoint: http://localhost:3000/auth/login when provided with the following JSON body:
        {
            "userName": "testUser5",
            "password": "testPassword1!"
        }

    is as follows: 
    Attempting to login user: testUser5
    User logged in successfully: {
    userName: 'testUser5',
    password: 'testPassword1!',
    email: 'test@uncg.edu',
    firstName: 'Test',
    lastName: 'Test',
    isAdmin: 0
    }

- /auth/isAdmin
this endpoint checks to see if an existing user is an admin or not. This is a post endpoint, and must be provided a username and password in the JSON body. 

An example call to this POST endpoint: http://localhost:3000/auth/isAdmin when provided with this JSON body:
    {
        "userName": "testUser5",
        "password": "testPassword1!"
    }

is as follows:
Attempting to validate admin user:  testUser5
User is not an admin: testUser5


