const mongoose = require("mongoose");
const schema = mongoose.schema;

//Create our Schema
const TournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  buyInCost: {
    type: Number,
  },
  cashedFor: {
    type: Number,
  },
  placement: {
    type: Number,
  },
  userId: {
    type: String,
    default: "",
  },
  userName: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Tournament = mongoose.model("tournament", TournamentSchema);
