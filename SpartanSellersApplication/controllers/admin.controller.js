// Setting up express and creating an app instance
const express = require("express");
const app = express();

// Using multer middleware for handling multipart/form-data
const multer = require("multer");
app.use(multer().none());

// Parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Parsing JSON bodies
app.use(express.json());

// Importing the admin model
const model = require("../models/admin.model");

// Function to retrieve all items to be approved
function getAllToBeApproved(req, res, next){
  let items = model.getAllToBeApproved();
  try{
    res.render("admin-listings", {items: items, title: 'All Items to be Approved'});
  }catch(err){
    console.error("Error getting items", err.message);
    next(err);
  }
}

// Function to approve an item
function approveItem(req, res, next) {
  try {
    // Extracting itemID from request parameters
    let itemID = parseInt(req.params.itemID);
    let params = [itemID];

    // Calling the model function to update approval status
    model.approveItem(params);
    
    let items = model.getAllToBeApproved();

    try{
      res.render('admin-listings', {items: items, title: 'All Items to be Approved'});
    } catch(err){
      console.error('Error getting items', err.message);
      next(err);
    }

  } catch (err) {
    console.error("Error while approving item ", err.message);
    next(err);
  }
}

// Function to remove an item
function removeItem(req, res, next) {
  let itemID = parseInt(req.params.itemID);
  let params = [itemID];
  try {
    model.removeItem(params);

    let items = model.getAllToBeApproved();

    try{
      res.render('admin-listings', {items: items, title: 'All Items to be Approved'});
    } catch(err){
      console.error('Error getting items', err.message);
      next(err);
    }

  } catch (err) {
    console.error("Error while removing item ", err.message);
    next(err);
  }
}

// Function to retrieve flagged users
function getFlaggedUsers(req, res, next){
  let users = model.getFlaggedUsers();
  try{
    res.render("admin-users", {users: users, title: 'All Flagged Users Awaiting Review'});
  }catch(err){
    console.error("Error getting users", err.message);
    next(err);
  }
}

// Function to remove a user flag
function removeFlag(req, res, next) {
  let userName = req.params.userName;
  let params = [userName];
  try {
    model.removeUserFlag(params);

    let users = model.getFlaggedUsers();

    try{
      res.render('admin-users', {users: users, title: 'All Flagged Users Awaiting Review'});
    } catch(err){
      console.error('Error getting users', err.message);
      next(err);
    }

  } catch (err) {
    console.error("Error while removing user flag ", err.message);
    next(err);
  }
}

// Function to ban a user
function banUser(req, res, next) {
  let userName = req.params.userName;
  let params = [userName];
  try {
    model.removeUserFlag(params);
    model.banUser(params);

    let users = model.getFlaggedUsers();

    try{
      res.render('admin-users', {users: users, title: 'All Flagged Users Awaiting Review'});
    } catch(err){
      console.error('Error getting users', err.message);
      next(err);
    }

  } catch (err) {
    console.error("Error while banning user ", err.message);
    next(err);
  }
}

// Exporting the functions
module.exports = {
  getAllToBeApproved,
  approveItem,
  removeItem,
  getFlaggedUsers,
  removeFlag,
  banUser
};
