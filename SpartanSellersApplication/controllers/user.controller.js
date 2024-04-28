// Setting up express and creating an app instance
const express = require("express");
const app = express();

// Using multer middleware for handling multipart/form-data
const multer = require("multer");
app.use(multer().none());

// Parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Importing axios for making HTTP requests
const axios = require('axios');

// Importing the user model
const model = require("../models/user.model");

// Function to retrieve all items
function getAll(req, res, next) {
  let items = model.getAll();
  try {
    // Rendering the view with retrieved items
    res.render("items-all", { items: items, title: 'All Items', user: req.session.currentUser.email });
  } catch (err) {
    console.error("Error while getting items ", err.message);
    next(err);
  }
}

// Function to retrieve all items to be approved
function getAllToBeApproved(req, res, next){
  let items = model.getAllToBeApproved();
  try{
    // Rendering the view with items to be approved
    res.render("admin-listings", {items: items, title: 'All Items to be Approved'});
  }catch(err){
    console.error("Error getting items", err.message);
    next(err);
  }
}

// Function to handle user login
function login(req, res, next){
  const { username, password } = req.body;
  console.log(username);
  console.log(password);
  try {
    // Retrieving user information from the model
    const user = model.getUserByUsername(username);
    console.log(user);
    // Checking user credentials
    if (!user || user[0].password !== password || user[0].banned === 1) {
      console.log(username + ' not authenticated!');
      return; 
    }

    console.log(username + ' authenticated!');

    if(req.session){
      console.log('session is running!');
      req.session.currentUser = user[0];
    }

    // Redirecting user based on role
    if(user[0].isAdmin === 1){
      res.redirect('/admin/all');
    }
    else{
      res.redirect('/user/all');
    }
    
  } catch (error) {
    console.error('Error while logging in:', error);
    res.status(500).send('Internal Server Error');
  }
}

// Function to list a new item
function listNewItem(req, res, next) {
  try {
      // Extracting item details from request body
      let userName = req.session.currentUser.userName;
      let itemName = req.body.itemName;
      let itemPrice = parseFloat(req.body.itemPrice);
      let description = req.body.description;
      let condition = req.body.condition;
      let category = req.body.category;
      let approval_status = 0;
      let sold = 0;
      
      let params = [userName, itemName, itemPrice, description, condition, category, approval_status, sold];
       model.listNewItem(params);
      res.redirect('/user/sell');

  } catch (err) {
      console.error("Error while creating item ", err.message);
      next(err);
  }
}

// Function to validate email and register user
function validateEmail(req, res, next){
    let userName = req.body.userName;
    let password = req.body.password;
    let email = req.body.email;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let isAdmin = 0;
    let banned = 0;
        
    let params = [userName, password, email, firstName, lastName, isAdmin, banned];

    // Validating email using Abstract API
    axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=7f82c8544978407d8ccb435d3df2062f&email=${email}`)
    .then(response => {
        model.register(params);
        res.render("index", { title: 'Login'});
    })
    .catch(error => {
        console.log('Email not validated!');
        // Sending an error response to the client
        res.status(500).json({ error: 'An error occurred while validating the email.' });
    });
}

// Function to render the registration page
function loadRegisterPage(req, res, next){
  res.render('register');
}

// Function to retrieve an item by ID
function getOneById(req, res, next) {
  let itemID = req.params.itemID;
  try {
    let item = model.getOneById(itemID);
    let email = model.getSellerEmail(itemID);
    res.render("item-details", { item: item, title: 'Item #' + itemID, user: req.session.currentUser.email, email: email.email, name: req.session.currentUser.firstName });
  } catch (err) {
    console.error("Error while getting item ", err.message);
    next(err);
  }
}

// Function to search for items
function search(req, res, next){
  const {keyword} = req.body;
  console.log(keyword);
  let items = model.search(keyword);
  console.log(items);
  try {
    res.render("search-results", { items: items, title: 'Searched Items', user: req.session.currentUser.email });
  } catch (err) {
    console.error("Error while searching items ", err.message);
    next(err);
  }
}

// Function to retrieve items by category
function getByCategory(req, res, next){
  let items = model.getByCategory(req.body.category);
  try{
    res.render("category-listings", {items: items, title: 'All Items in '+ req.params.category, user: req.session.currentUser.email});
  }catch(err){
    console.error("Error getting items", err.message);
    next(err);
  }
}

// Function to retrieve pricing information for all items
function getPricingInfoAll(req, res, next){
  let data = model.getPricingInfoAll();
  try{
    res.render("pricing-info", {title: 'Pricing Info', user: req.session.currentUser.email, data: data, category: "All", numListed: data.numListed  });
  }catch(err){
    console.error("Error getting info all", err.message);
    next(err);
  }
}

// Function to retrieve pricing information for a specific category
function getPricingInfoCategory(req, res, next){
  let data = model.getPricingInfoCategory(req.body.category);
  let numListed = model.getNumListedCategory(req.body.category);
  try{
    res.render("pricing-info", {title: 'Pricing Info', user: req.session.currentUser.email, data: data, category: req.body.category, numListed: numListed.numListed  });
  }catch(err){
    console.error("Error getting info all", err.message);
    next(err);
  }
}

// Function to retrieve sellers
function getSellers(req, res, next){
  let sellers = model.getSellers();
  try{
    res.render("sellers", {title: 'Sellers', user: req.session.currentUser.email, sellers: sellers  });
  }catch(err){
    console.error("Error getting info all", err.message);
    next(err);
  }
}

// Function to retrieve ratings for a seller
function getRatings(req, res, next){
  let reviews = model.getRatings(req.params.email);
  let user = model.getUserNameByEmail(req.params.email);
  let userName = user[0].userName;
  try{
    res.render("seller-reviews", {title: 'Reviews for ' + req.params.email, user: req.session.currentUser.email, reviews: reviews, email: req.params.email, username: userName  });
  }catch(err){
    console.error("Error getting info all", err.message);
    next(err);
  }
}

// Function to leave a review for a seller
function leaveReview(req, res, next){
  try {
    console.log(req.body);
    let userName = req.body.userName;
    let numberOfStars = req.body.numberOfStars;
    let ratingComment = req.body.ratingComment;
    
    if(userName === req.session.currentUser.userName){
      throw new Error('Cannot review yourself!');
    }
    let params = [userName, numberOfStars, ratingComment];
    model.leaveReview(params);

    let reviews = model.getRatings(req.body.email);
    res.render("seller-reviews", {title: 'Reviews for ' + req.body.email, user: req.session.currentUser.email, reviews: reviews, email: req.body.email, username: userName  });
  } catch (err) {
      console.error("Error while creating review ", err.message);
      next(err);
  }
}

// Function to generate user profile
function generateProfile(req, res, next){
  try{
    let firstName = req.session.currentUser.firstName;
    let reviews = model.getRatings(req.session.currentUser.email);
    let group = model.getItemsAwaitingApproval(req.session.currentUser.userName);
    let items = model.getItemsForSale(req.session.currentUser.userName);
    res.render("user-profile", {title: 'Profile', user: req.session.currentUser.email, firstName: firstName, reviews: reviews, group: group, items: items  });
  }catch (err) {
    console.error("Error while creating profile ", err.message);
    next(err);
  }
}

// Function to mark an item as sold
function markSold(req, res, next){
  let itemID = req.body.itemID;
  model.markSold(itemID);
  try{
    let firstName = req.session.currentUser.firstName;
    let reviews = model.getRatings(req.session.currentUser.email);
    let group = model.getItemsAwaitingApproval(req.session.currentUser.userName);
    let items = model.getItemsForSale(req.session.currentUser.userName);
    res.render("user-profile", {title: 'Profile', user: req.session.currentUser.email, firstName: firstName, reviews: reviews, group: group, items: items  });
  }catch (err) {
    console.error("Error while creating profile ", err.message);
    next(err);
  }

}

// Function to render the admin bulk product upload page
function sellPage(req, res) {
  res.render('seller-page', {  title: 'Spartan Seller | Seller', user: req.session.currentUser.email, });
}


// Function to handle user logout
function logout(req, res, next){
  req.session.currentUser = null;
  res.redirect("/");
}

// Exporting all functions
module.exports = {
  getAll,
  login,
  listNewItem,
  getAllToBeApproved,
  loadRegisterPage,
  validateEmail,
  getOneById,
  search,
  getByCategory,
  getPricingInfoAll,
  getPricingInfoCategory,
  getSellers,
  getRatings,
  leaveReview,
  generateProfile,
  markSold,
  sellPage,
  logout
};
