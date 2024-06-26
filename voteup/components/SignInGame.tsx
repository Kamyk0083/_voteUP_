import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Game() {
  const { user } = useUser();
  const [games, setGames] = useState<Game[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [vote, setVote] = useState("");
  const email = user?.primaryEmailAddress?.emailAddress;
  const name =
    user?.firstName || user?.lastName || user?.username || "Użytkownik";

  interface Game {
    nazwa: string;
    opis: string;
    baner: string;
    strona: string;
    typ: string;
    data: string;
  }

  interface Vote {
    email: string;
  }

  useEffect(() => {
    const fetchGames = async () => {
      const response = await axios.get("/api/getGame");
      setGames(response.data.games);
      console.log(response.data);
    };
    fetchGames();

    const fetchVotes = async () => {
      try {
        const response = await axios.get("/api/get-vote");
        const votesArray = response.data.votes;
        const votesObject: Record<string, number> = {};
        votesArray.forEach((vote: { game: string; count: number }) => {
          votesObject[vote.game] = vote.count;
        });
        setVotes(votesObject);

        const voted = votesArray.some((vote: Vote) => vote.email === email);
        setHasVoted(voted);
      } catch (error) {
        console.error("Nie udało się pobrać danych o głosach", error);
      }
    };

    fetchVotes();
  }, [email]);

  const handleVote = async (gameName: string) => {
    setVote(gameName);
    try {
      await axios.post("/api/vote", {
        name,
        email,
        vote: gameName,
      });
      setHasVoted(true);
      alert("Dziękujemy za oddanie głosu!");
    } catch (error) {
      console.error("Nie udało się oddać głosu", error);
    }
  };

  return (
    <main className="flex flex-col items-center">
      <div className="flex items-center flex-col justify-center m-8 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white p-4 rounded-lg shadow-xl text-center">
        Festiwal CEGEF ma na celu zapewnienie edukacji, rozrywki i możliwości
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
                Opis: {game.opis}
              </p>
              <Link
                href={`//${game.strona}`}
                className="text-blue-500 hover:text-blue-700 block mt-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Strona gry
              </Link>
              <p className="text-sm sm:text-base text-gray-500 mt-2">
                Typ: {game.typ}
              </p>
              <p className="text-sm sm:text-base text-gray-500 mt-2">
                Data premiery: {new Date(game.data).toLocaleDateString()}
              </p>
            </div>
            <button
              className={`${
                hasVoted
                  ? "bg-gray-700 hover:bg-gray-800"
                  : "bg-green-500 hover:bg-green-600"
              } text-white font-bold py-2 px-4 rounded mb-4 mx-auto block m-4`}
              onClick={() => handleVote(game.nazwa)}
              disabled={hasVoted}
            >
              {hasVoted ? (
                <Link href="/votes" className="text-white">
                  Zobacz wyniki
                </Link>
              ) : (
                "Załosuj na tą grę"
              )}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
