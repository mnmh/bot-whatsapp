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
  },
  location_string: {
    type:String
  },
  location: {
    type: {
        type: String,
        enum: ['Point']
    },
    coordinates: {
        type: [Number]
    }
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
