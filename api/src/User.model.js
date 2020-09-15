const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  from: {
    type: String
  },
  state: {
    type: String
  },
  value: {
    type: Number
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
