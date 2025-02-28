const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

const registerUser = (name, email, password) => {
  bcrypt.hash(password, 10, (error, hash)=>{
        if (error) {
          return res.status(500).json({message: "password hashing error"})
        }
        const newUser = userModel.create({
          name,
          email,
          password: hash,
        })
        const authToken = jwt.sign({id: newUser._id}, process.env.JWT_SECRET)
        res.status(200).json({token: authToken})
      })
}

module.exports = registerUser;