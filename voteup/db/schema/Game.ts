import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  nazwa: { type: String, required: true },
  opis: { type: String, required: true },
  baner: { type: String, required: true },
  strona: { type: String, required: true },
  typ: { type: String, required: true },
  data: { type: Date, required: true },
  votes: { type: Number, default: 0},
});

const Game = mongoose.models.Game || mongoose.model("Game", gameSchema);

export default Game;
