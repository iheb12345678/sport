// import mongoose module
const mongoose = require("mongoose");
// create player schema (attributes with types)
const playerSchema = mongoose.Schema({
    nbr: Number,
    age: Number,
    name: String,
    position: String,
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    }
});
// create model Name and affect to schema
const player = mongoose.model("Player", playerSchema);
// make player exportable
module.exports = player;