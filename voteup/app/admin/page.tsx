"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";
import Link from "next/link";

interface CustomJwtPayload extends JwtPayload {
  admin?: boolean;
}

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [gameDescription, setGameDescription] = useState("");
  const [gameBanner, setGameBanner] = useState("");
  const [gamePage, setGamePage] = useState("");
  const [gameType, setGameType] = useState("");
  const [gameReleaseDate, setGameReleaseDate] = useState("");
  const [gameName, setGameName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      if (decoded.admin) {
        setIsAdmin(true);
      }
    }
  }, []);

  const handleAddGame = async () => {
    try {
      await axios.post("/api/addGame", {
        nazwa: gameName,
        opis: gameDescription,
        baner: gameBanner,
        strona: gamePage,
        typ: gameType,
        data: gameReleaseDate,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold mb-4 text-red-600">
          Hmm, wygląda na to, że nie jesteś adminem. Chyba zabłądziłeś.
        </p>
        <Link
          href="/"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Powrót do strony głównej
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <p className="text-lg font-semibold mb-4 text-green-600">Panel Admina</p>
      <form
        className="space-y-4 w-full max-w-lg p-5 bg-white shadow-lg rounded-lg"
        onSubmit={handleAddGame}
      >
        <input
          type="text"
          placeholder="Nazwa Gry"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setGameName(e.target.value)
          }
          className="input w-full p-2 border rounded text-black"
        />
        <input
          type="text"
          placeholder="Opis gry"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setGameDescription(e.target.value)
          }
          className="input w-full p-2 border rounded text-black"
        />
        <input
          type="text"
          placeholder="Link do zdjęcia gry"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setGameBanner(e.target.value)
          }
          className="input w-full p-2 border rounded text-black"
        />
        <input
          type="text"
          placeholder="Strona gry"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setGamePage(e.target.value)
          }
          className="input w-full p-2 border rounded text-black"
        />
        <input
          type="text"
          placeholder="Typ gry"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setGameType(e.target.value)
          }
          className="input w-full p-2 border rounded text-black"
        />
        <input
          type="date"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setGameReleaseDate(e.target.value)
          }
          className="input w-full p-2 border rounded text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Dodaj grę
        </button>
      </form>
    </div>
  );
}
