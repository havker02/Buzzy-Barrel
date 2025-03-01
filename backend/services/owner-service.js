const ownerModel = require("../models/owner-model");

module.exports.createOwner = async (name, email, hash)=>{
  try {
    return await ownerModel.create({
      name,
      email,
      password: hash,
    })
  } catch (error) {
    return res.status(500).json({message: "Internal server error: " + error.message})
  }
}