import mongoose from "mongoose";

const Vote = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  vote: { type: String, required: true },
});

export default mongoose.models.Vote || mongoose.model("Votes", Vote);
