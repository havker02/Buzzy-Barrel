const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");

// route to handle user registration
router.post("/register", userController.registerUser)

// route to handle user login
router.post("/login", userController.loginUser)

module.exports = router;