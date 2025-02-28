const userModel = require("../models/user-model");
const userService = require("../services/user-service")

// register a new user if user does not exist otherwise return an error
module.exports.registerUser = async (req, res) => {
  const {name, email, password} = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({message: "Please fill all fields"})
    }
    const existUser = await userModel.findOne({email})
    if(existUser){
      return res.status(400).json({message: "user already exist"})
    }
    const hashedPassword = await userModel.hashPassword(password)
    const createdUser = await userService.createUser(name, email, hashedPassword)
    const token = await createdUser.generateAuthToken()
    console.log(token)
    return res.status(201).json({message: "user created successfully", token, createdUser})
  } catch (error) {
    return res.status(500).json({message: "Internal server error: "+error.message})
  }
}

// login a user if user exists & email or password is correct otherwise return an error
module.exports.loginUser = async (req, res) => {
  const {email, password} = req.body;
  try {
    if(!email || !password){
      return res.status(400).json({message: "Please fill all fields"})
    }
    const user = await userModel.findOne({email})
    if(!user){
      return res.status(400).json({message: "Invalid credentials"}) 
    }
    const isMatch = await user.comparePassword(password)
    if(!isMatch){
      return res.status(400).json({message: "Invalid credentials"})
    }
    const token = await user.generateAuthToken()
    return res.status(200).json({message: "user logged in successfully", token, user})
  } catch (error) {
    return res.status(500).json({message: "Internal server error: "+error.message})
  }
}