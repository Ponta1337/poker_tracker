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
    required: true,
  },
  cashedFor: {
    type: Number,
    required: true,
  },
  placement: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Tournament = mongoose.model("tournament", TournamentSchema);
