"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { error } from "console";

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const name = user?.firstName;
  const email = user?.primaryEmailAddress?.emailAddress;
  const vote = "Nazwa Gry";

  const handleVote = async () => {
    try {
      await axios.post("/api/vote", {
        name,
        email,
        vote,
      });
    } catch (error) {
      console.error(error);
      console.log("Nie udało się oddać głosu");
    }
  };

  if (!isSignedIn) {
    return (
      <div className="main-container">
        <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
          <div className="flex font-bold uppercase items-center">
            <p className="text-lg">vote</p>
            <p className="text-green-500 text-2xl">UP</p>
          </div>
          <div>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2">
              <Link href={"/sign-in"}>Sign In</Link>
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              <Link href={"/sign-up"}>Sign Up</Link>
            </button>
          </div>
        </header>
        <main className="flex flex-wrap justify-center">
          <div className="max-w-10 mx-4 my-6 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <img
              className="w-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShoeZTCWQPFiuc4IkW0fmkzjh84gLrw9figHs-XKXG&s"
              alt="Game Banner"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold">Nazwa Gry</h2>
              <p className="text-gray-500">Opis gry</p>
              <Link href={"https://gry.pl"} className="text-blue-500">
                Strona gry
              </Link>
              <p className="text-gray-500">Typ gry</p>
              <p className="text-gray-500">Data premiery</p>
            </div>
            <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mb-4 mx-auto block">
              Aby załosować musisz się zalogować
            </button>
          </div>
        </main>
      </div>
    );
  }
  if (isSignedIn) {
    return (
      <div className="main-container">
        <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
          <div className="flex font-bold uppercase items-center">
            <p className="text-lg">vote</p>
            <p className="text-green-500 text-2xl">UP</p>
          </div>
          <p className="text-white">
            Witaj, {user.firstName} na aplikacja do głosowania
          </p>
          <UserButton />
        </header>
        <main className="flex flex-wrap justify-center">
          <div className="max-w-10 mx-4 my-6 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <img
              className="w-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShoeZTCWQPFiuc4IkW0fmkzjh84gLrw9figHs-XKXG&s"
              alt="Game Banner"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold">Nazwa Gry</h2>
              <p className="text-gray-500">Opis gry</p>
              <Link href={"https://gry.pl"} className="text-blue-500">
                Strona gry
              </Link>
              <p className="text-gray-500">Typ gry</p>
              <p className="text-gray-500">Data premiery</p>
            </div>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4 mx-auto block"
              onClick={handleVote}
            >
              Załosuj na tą gre
            </button>
          </div>
        </main>
      </div>
    );
  }
}
