const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {timestamps: true})

// hash password before saving to database
userSchema.statics.hashPassword = async function (password){
  const hashedPassword = await bcrypt.hash(password, 10)
  return hashedPassword
}

// compare password before login
userSchema.methods.comparePassword = async function(password){
  const isMatch = await bcrypt.compare(password, this.password)
  return isMatch
}

// generate auth token if signup or login is successful
userSchema.methods.generateAuthToken = async function (){
  return jwt.sign({id: this._id}, process.env.JWT_SECRET)
}

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;