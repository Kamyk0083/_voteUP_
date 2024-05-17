import mongoose from "mongoose";

const firmaSchema = new mongoose.Schema({
  nazwa: {
    type: String,
    require: true,
    unique: true,
  },
  strona: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  haslo: {
    type: String,
    require: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.Firma || mongoose.model("Firma", firmaSchema);
