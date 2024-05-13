import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);
