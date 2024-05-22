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
    };
    fetchGames();
  }, []);
  return (
    <main className="flex flex-col">
      <div className="flex items-center flex-col justify-center m-8 bg-gradient-to-r bg-gray-800 text-white p-4 rounded-lg shadow-xl text-center">
        rozwoju gospodarczego. Uczestnicy mogą poznać ścieżki rozwoju zawodowego
        w kreatywnych branżach, z ekspertami z dziedziny multimediów,
        projektowania, reżyserii dźwięku i zarządzania umiejętnościami miękkimi.
        Więcej informacji można znaleźć na stronie cegef.pl
      </div>
      <div className="flex flex-wrap justify-center">
        {games.map((game) => (
          <div
            key={game.nazwa}
            className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-3 my-4 bg-white rounded-xl shadow-lg overflow-hidden flex flex-col justify-between"
          >
            <img className="w-full" src={game.baner} alt={game.nazwa} />
            <div className="p-4 sm:p-8 flex-grow">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {game.nazwa}
              </h2>
              <p className="text-sm sm:text-base text-gray-500 mt-2">
                {game.opis}
              </p>
              <Link
                href={`//${game.strona}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 block mt-2"
              >
                Strona gry
              </Link>
              <p className="text-sm sm:text-base text-gray-500 mt-2">
                {game.typ}
              </p>
              <p className="text-sm sm:text-base text-gray-500 mt-2">
                Data premiery: {new Date(game.data).toLocaleDateString()}
              </p>
            </div>
            <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mb-4 mx-auto block w-4/5 sm:w-3/5 text-center text-sm sm:text-base">
              Aby załosować musisz się zalogować
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
