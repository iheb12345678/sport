// import mongoose module
const mongoose = require("mongoose");
// create team schema (attributes with types)
const teamSchema = mongoose.Schema({
    foundation: Number,
    name: String,
    owner: String,
    playersId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player"
    }]
});
// create model Name and affect to schema
const team = mongoose.model("Team", teamSchema);
// make team exportable
module.exports = team;