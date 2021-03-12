const mongoose = require("mongoose");
const schema = mongoose.schema;

//Create our Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    // required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  last_visited_date: {
    type: Date,
    default: Date.now,
  },
  profile_views: {
    type: Number,
    default: 0,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
