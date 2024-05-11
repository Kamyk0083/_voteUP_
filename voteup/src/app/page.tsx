"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  admin?: boolean;
}
interface Vote {
  email: string;
}

interface Game {
  nazwa: string;
  opis: string;
  baner: string;
  strona: string;
  typ: string;
  data: string;
}

export default function Home() {
  const { isSignedIn, user } = useUser();
  const name = user?.firstName;
  const email = user?.primaryEmailAddress?.emailAddress;
  const [votes, setVotes] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [games, setGames] = useState<Game[]>([]);
  const [vote, setVote] = useState("");
  const [loggedInUser, setLoggedInUser] = useState<CustomJwtPayload | null>(
    null
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      setLoggedInUser(decoded);
    }
  }, []);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await axios.get("/api/get-vote");
        setVotes(response.data.votes);
        const voted = response.data.votes.some(
          (vote: Vote) => vote.email === email
        );
        setHasVoted(voted);
      } catch (error) {
        console.error("Nie udało się pobrać danych o głosach", error);
      }
    };

    fetchVotes();
  }, [email]);

  useEffect(() => {
    const fetchGames = async () => {
      const response = await axios.get("/api/getGame");
      setGames(response.data.games);
      console.log(response.data);
    };
    fetchGames();
  }, []);

  const handleVote = async (gameName: string) => {
    setVote(gameName);
    try {
      await axios.post("/api/vote", {
        name,
        email,
        vote: gameName,
      });
      setHasVoted(true);
    } catch (error) {
      console.error("Nie udało się oddać głosu", error);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="main-container">
        <header className="bg-gray-800 text-white py-2 sm:py-4 px-3 sm:px-6 flex justify-between items-center">
          <div className="flex font-bold uppercase items-center">
            <p className="text-sm sm:text-lg">vote</p>
            <p className="text-green-500 text-xl sm:text-2xl">UP</p>
          </div>
          <div>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 sm:py-2 px-3 sm:px-4 rounded mr-2">
              <Link href={"/sign-in"}>Sign In</Link>
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 sm:py-2 px-3 sm:px-4 rounded">
              <Link href={"/sign-up"}>Sign Up</Link>
            </button>
            {loggedInUser?.admin && (
              <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-1 sm:py-2 px-3 sm:px-4 rounded ml-2">
                <Link href={"/admin"}>Admin</Link>
              </button>
            )}
          </div>
        </header>
        <main className="flex flex-wrap justify-center">
          {games.map((game) => (
            <React.Fragment key={game.nazwa}>
              <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-6 my-8 bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  className="w-full mx-auto"
                  src={game.baner}
                  alt={game.nazwa}
                />
                <div className="p-4 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold">
                    {game.nazwa}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-500">
                    {game.opis}
                  </p>
                  <Link
                    href={game.strona}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Strona gry
                  </Link>
                  <p className="text-sm sm:text-base text-gray-500">
                    {game.typ}
                  </p>
                  <p className="text-sm sm:text-base text-gray-500">
                    Data premiery: {new Date(game.data).toLocaleDateString()}
                  </p>
                </div>

                <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mb-4 mx-auto block">
                  Aby załosować musisz się zalogować
                </button>
              </div>
            </React.Fragment>
          ))}
        </main>
      </div>
    );
  }

  return (
    <div className="main-container">
      <header className="bg-gray-800 text-white py-2 sm:py-4 px-3 sm:px-6 flex justify-between items-center">
        <div className="flex font-bold uppercase items-center">
          <p className="text-sm sm:text-lg">vote</p>
          <p className="text-green-500 text-xl sm:text-2xl">UP</p>
        </div>
        <p className="text-white">
          Witaj, {user.firstName} na aplikacja do głosowania
        </p>
        <div>
          <UserButton />
          {loggedInUser?.admin && (
            <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-1 sm:py-2 px-3 sm:px-4 rounded ml-2">
              <Link href={"/admin"}>Admin</Link>
            </button>
          )}
        </div>
      </header>
      <main className="flex flex-wrap justify-center">
        {games.map((game) => (
          <div
            key={game.nazwa}
            className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-6 my-8 bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <img className="w-full mx-auto" src={game.baner} alt={game.nazwa} />
            <div className="p-4 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold">{game.nazwa}</h2>
              <p className="text-sm sm:text-base text-gray-500">
                Opis: {game.opis}
              </p>
              <Link
                href={game.strona}
                className="text-blue-500 hover:text-blue-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                Strona gry
              </Link>
              <p className="text-sm sm:text-base text-gray-500">
                Typ: {game.typ}
              </p>
              <p className="text-sm sm:text-base text-gray-500">
                Data premiery: {new Date(game.data).toLocaleDateString()}
              </p>
              <button
                className={`${
                  hasVoted
                    ? "bg-gray-700 hover:bg-gray-800"
                    : "bg-green-500 hover:bg-green-600"
                } text-white font-bold py-2 px-4 rounded mb-4 mx-auto block`}
                onClick={() => handleVote(game.nazwa)}
                disabled={hasVoted}
              >
                {hasVoted ? "Już oddałeś głos" : "Załosuj na tą gre"}
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
