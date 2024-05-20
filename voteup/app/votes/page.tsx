"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface Game {
  _id: string;
  nazwa: string;
  opis: string;
  baner: string;
  strona: string;
  typ: string;
  data: string;
  votes: number;
}

export default function Game() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const response = await axios.get("/api/getGame");
      setGames(response.data.games);
    };
    fetchGames();
  }, []);

  return (
    <div className="min-h-screen bg-gray-800 flex items-start justify-center">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center my-6">
          Wyniki głosowania
        </h1>
        {games
          .sort((a, b) => b.votes - a.votes)
          .map((game, index) => (
            <div
              key={game._id}
              className={`p-4 my-2 border rounded shadow-md text-black ${
                index === 0
                  ? "bg-yellow-500 text-black"
                  : index === 1
                  ? "bg-gray-400 text-black"
                  : index === 2
                  ? "bg-yellow-700 text-black"
                  : "bg-white"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{game.nazwa}</h2>
                  <p className="text-sm">Liczba głosów: {game.votes}</p>
                </div>
                <span className="text-xl font-bold">{index + 1}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
