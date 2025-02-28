const mongoose = require("mongoose");

const db_url = process.env.DB_URL;

const connectDB = async () => {
  mongoose
    .connect(db_url)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
