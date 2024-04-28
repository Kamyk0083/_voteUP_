import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: String,
  age: Number,
});

const user = mongoose.model("user", UserSchema);

module.exports = user;
