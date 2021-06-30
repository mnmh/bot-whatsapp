const mongoose = require("mongoose");

const connection = "mongodb://localhost:27005/bot?authSource=admin";

const connectDb = () => {
  return mongoose.connect(connection);
};

module.exports = connectDb;
