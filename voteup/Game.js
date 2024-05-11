import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  nazwa: String,
  opis: String,
  baner: String,
  strona: String,
  typ: String,
  data: Date,
});

const Game = mongoose.models.Game || mongoose.model("Game", gameSchema);

export default Game;
