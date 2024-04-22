"use strict";
const db = require("../models/db-conn");
const path = require("path");

// Function to retrieve all items awaiting approval
function getAllToBeApproved() {
  // SQL query to select items with approval_status = 0
  let sql = "SELECT * FROM Item WHERE approval_status = 0;";
  // Executing the query
  const data = db.all(sql);
  return data;
};

// Function to approve an item
function approveItem(params){
  // SQL query to update approval_status to 1 for the specified item
  let sql = "UPDATE Item SET approval_status = 1 WHERE itemID = ?;";
  // Executing the query with provided parameters
  const response = db.run(sql, params);
  return response;
};

// Function to remove an item
function removeItem(params){
  // SQL query to delete the specified item
  let sql = "DELETE FROM Item WHERE itemID = ?;";
  // Executing the query with provided parameters
  const response = db.run(sql, params);
  return response;
};

// Function to retrieve flagged users
function getFlaggedUsers(){
  // SQL query to select flagged users and their reasons
  let sql ='SELECT User.userName, User.email, User.firstName, User.lastName, Flagged_Users.reason_Flagged FROM User INNER JOIN Flagged_Users ON User.userName = Flagged_Users.userName;';
  // Executing the query
  const data = db.all(sql);
  return data;
};

// Function to remove flag from a user
function removeUserFlag(params){
  // SQL query to delete flag for the specified user
  let sql = "DELETE FROM Flagged_Users WHERE userName = ?;";
  // Executing the query with provided parameters
  const response = db.run(sql, params);
  return response;
};

// Function to ban a user
function banUser(params){
  // SQL query to set banned status to 1 for the specified user
  let sql = "UPDATE User SET banned = 1 WHERE userName = ?;";
  // Executing the query with provided parameters
  const response = db.run(sql, params);
  return response;
};

// Exporting all functions
module.exports = {
  getAllToBeApproved,
  approveItem,
  removeItem,
  getFlaggedUsers,
  removeUserFlag,
  banUser
};
