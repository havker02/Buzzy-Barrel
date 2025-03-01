const ownerModel = require("../models/owner-model");
const ownerService = require("../services/owner-service");

// creates new admin
module.exports.registerOwner = async (req, res) => {
  const {name, email, password} = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({message: "All fields are required"})
    }
    const existOwner = await ownerModel.findOne({email});
    if(existOwner){
      return res.status(400).json({message: "Email already exists"});
    }
    const hash = await ownerModel.hashPassword(password);
    const owner = await ownerService.createOwner(name, email, hash)
    const token = await ownerModel.generateAuthToken(owner)
    res.status(201).json({message: "Admin created successfully", owner, token})
  } catch (error) {
    return res.status(500).json({message: "Internal server error: " + error.message})
  }
}