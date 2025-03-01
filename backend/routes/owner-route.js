const express = require("express");
const router = express.Router();
const ownerController = require("../controllers/owner-controller");

router.post("/register", ownerController.registerOwner)

module.exports = router;