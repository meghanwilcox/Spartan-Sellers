The following is a list of the endpoints in the itemDataController class, along with thier specifications for use: 

- /user/get-flagged-users
    this endpoint returns an array of all of the tuples in the Flagged_Users table. This is a GET endpoint. 

    An example call/response to this GET endpoint: http://localhost:3000/user/get-flagged-users
    is as follows:

    [
        {
            "userName": "testUsername2",
            "reason_Flagged": "testDescription"
        },
        {
            "userName": "testusername3",
            "reason_Flagged": "testDescription"
        }
    ]

    if there are no flagged users, it will return an empty array: [], and this response:

    Attempting to fetch flagged users.
    No flagged users found.

- /user/remove-flagged-user
    this endpoint removes a user from the Flagged_Users table. This endpoint should be used when a user has been flagged, the admin has reviewed thier information, deemed that they should not be removed from the site, and wishes to remove the flag on thier account. This endpoint should not be used when an admin wants to remove a user's account entirely, instead, this endpoint removes the flag on the user, and allows them continue normal use of the site. This endpoint requires a userName to be provided in the JSON body.

    An example call and response from this DELETE endpoint http://localhost:3000/user/remove-flagged-users with this provided JSON body:
        {
            "userName": "testUsername2"
        }

    with the following response: 
    Attempting to remove flagged user:  testUsername2
    Flagged user removed successfully!

- /user/remove-user
this endpoint removes a user from the site entirely, and should ALWAYS be used in conjunction with the /item/remove-users-items endpoint in the itemDataController class. The reason for this is that we don't want a user to be removed, and still have items that reference their username (which will not exist at that point). A user should be removed when the admin deems their actions undesirebale or against the guidelines of the site. This endpoint must be provided a username in the JSON body.

An example call and response from this DELETE endpoint: http://localhost:3000/user/remove-user when provided with this JSON data:
    {
        "userName": "testUser1"
    }
is as follows:
Attempting to remove user:  testUser1
User removed successfully!




