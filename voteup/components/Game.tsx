import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Game() {
  const [games, setGames] = useState<Game[]>([]);

  interface Game {
    nazwa: string;
    opis: string;
    baner: string;
    strona: string;
    typ: string;
    data: string;
  }

  useEffect(() => {
    const fetchGames = async () => {
      const response = await axios.get("/api/getGame");
      setGames(response.data.games);
      console.log(response.data);
    };
    fetchGames();
  }, []);
  return (
    <main className="flex flex-wrap justify-center">
      {games.map((game) => (
        <div
          key={game.nazwa}
          className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-6 my-8 bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <img className="w-full" src={game.baner} alt={game.nazwa} />
          <div className="p-4 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              {game.nazwa}
            </h2>
            <p className="text-sm sm:text-base text-gray-500">{game.opis}</p>
            <Link
              href={game.strona}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              Strona gry
            </Link>
            <p className="text-sm sm:text-base text-gray-500">{game.typ}</p>
            <p className="text-sm sm:text-base text-gray-500">
              Data premiery: {new Date(game.data).toLocaleDateString()}
            </p>
          </div>
          <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mb-4 mx-auto block">
            Aby załosować musisz się zalogować
          </button>
        </div>
      ))}
    </main>
  );
}
