const userModel = require("../models/user-model");

module.exports.createUser = async (name, email, hashedPassword) => {
  try {
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    })
    return user
  } catch (error) {
    throw new Error("Internal server error : "+error.message)
  }
}