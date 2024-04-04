The following is a list of the endpoints in the itemDataController class, along with thier specifications for use: 

- /item/get-items-to-be-approved
    this endpoint returns an array of items to be approved by the admin. 

    An example response from a GET request from this endpoint: http://localhost:3000/item/get-items-to-be-approved is: 

    [
        {
            "userName": "meghanWilcox",
            "itemID": 5,
            "itemName": "TestItem1",
            "itemPrice": 1,
            "description": "test item description",
            "condition": "Poor",
            "category": "Dorm Supplies",
            "approval_status": 0
        },
        {
            "userName": "testUser1",
            "itemID": 6,
            "itemName": "TestItem3",
            "itemPrice": 1,
            "description": "test item description",
            "condition": "Good",
            "category": "School Supplies",
            "approval_status": 0
        }
    ]

    this can be parsed to retreive the necessary item data. 

- /item/approve-item
    this endpoint changes the status of an item's approval_status attribute to 1, based on the provided itemID. This endpoint is a PUT endpoint, and must be provided with an itemID in the JSON body. The repsonse will include the ID that the endpoint is attempting to approve, and the number of rows in the Item table that were changed by the query.

    An example call and response to this PUT endpoint http://localhost:3000/item/approve-item when provided with this JSON body:
        {
            "itemID": 6
        }
    is as follows: 
    Attempting to approve item for itemID: 6
    Item approved successfully: { stmt: Statement { stmt: undefined }, lastID: 0, ch
    anges: 1 }

- /item/refuse-item
    this endpoint essentially 'does not approve' an item. It does this by deleting it from the itm table entirely. This only removes 1 item with a provided itemID. This is a DELETE endpoint, and must be provided the itemID in the JSON body. 

    An example call and response to this DELETE endpoint http://localhost:3000/item/refuse-item when provided with this JSON body: 
        {
            "itemID": 6
        }
    is as follows:
    Attempting to remove item:  6
    Item removed successfully!

- /item/remove-users-items
this endpoint removes all of the items that are listed by a specified user. This endpoint is necessary because if we remove a user that has been flagged, there will still be items in the database that reference that user's username, which now does not exist. For this reason, when we remove a user, we must also remove all the items that they listed. This endpoint is a DELETE endpoint, and must be provided a userName in the JSON body.

An example call and response to this DELETE endpoint http://localhost:3000/item/remove-users-items when provided with this JSON body:
    {
        "userName": "testUser1"
    }
is as follows:
Attempting to remove items for user:  testUser1
Items removed successfully!







