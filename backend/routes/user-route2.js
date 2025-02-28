const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");
const createUser = require("../utils/create-user");

router.post("/register", async (req, res)=>{
  const {name, email, password} = req.body;

  try {
    const existUser = await userModel.findOne({email})
    if(existUser){
      return res.status(400).json({message: "user already exist"})
    }
    createUser(name, email, password);
  } catch (error) {
    res.status(500).json({message: "Internal server error: "+error.message})
  }
  
})

module.exports = router;