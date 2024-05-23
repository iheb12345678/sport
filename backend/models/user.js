// import mongoose module
const mongoose = require("mongoose");
// create user schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    pwd: String,
    tel: String,
    role: String,
    avatar:String
});

const user = mongoose.model("User", userSchema);
module.exports = user;