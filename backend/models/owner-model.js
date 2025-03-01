const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ownerSchema = new mongoose.Schema({
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

ownerSchema.statics.hashPassword = async function(password) {
  return bcrypt.hash(password, 10)
}

ownerSchema.statics.generateAuthToken = async function(owner){
  return jwt.sign({id: owner._id},process.env.JWT_SECRET)
}

const ownerModel = mongoose.model("owner", ownerSchema);

module.exports = ownerModel;