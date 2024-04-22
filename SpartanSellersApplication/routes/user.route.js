"use strict";
const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.get("/all", userController.getAll);
router.post("/login", userController.login);
router.get("/registerPage", userController.loadRegisterPage);
router.post("/register", userController.validateEmail);
router.get("/item-details/:itemID", userController.getOneById);
router.post("/new", userController.listNewItem);
router.post("/search", userController.search);
router.post("/filter", userController.getByCategory);
router.get("/dataAll", userController.getPricingInfoAll);
router.post("/dataCategory", userController.getPricingInfoCategory);
router.get("/sellers", userController.getSellers);
router.get("/ratings/:email", userController.getRatings);
router.post("/makeReview", userController.leaveReview);
router.get("/profile", userController.generateProfile);
router.post("/sold", userController.markSold);
router.post("/logout", userController.logout);

module.exports = router;
