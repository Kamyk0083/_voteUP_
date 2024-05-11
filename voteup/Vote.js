import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  vote: { type: String, required: true },
});

const Vote = mongoose.models.Vote || mongoose.model("Vote", voteSchema);

export default Vote;
