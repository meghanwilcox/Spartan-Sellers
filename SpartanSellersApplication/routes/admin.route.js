"use strict";
const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");

router.get("/all", adminController.getAllToBeApproved);
router.post("/approve/:itemID", adminController.approveItem);
router.post("/remove/:itemID", adminController.removeItem);
router.get("/users-list", adminController.getFlaggedUsers);
router.post("/removeFlag/:userName", adminController.removeFlag);
router.post("/banUser/:userName", adminController.banUser);
module.exports = router;