// import mongoose module
const mongoose = require("mongoose");
// create match schema (attributes with types)
const matchSchema = mongoose.Schema({
    scoreOne: Number,
    scoreTwo: Number,
    teamOne: String,
    teamTwo: String,
});
// create model Name and affect to schema
const match = mongoose.model("Match", matchSchema);
// make match exportable
module.exports = match;