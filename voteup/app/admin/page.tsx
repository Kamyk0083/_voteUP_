"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";
import Link from "next/link";
import { useVoting } from "./../context/VotingContext";

interface CustomJwtPayload extends JwtPayload {
  admin?: boolean;
}

const Admin = () => {
  const { setVotingEnded } = useVoting();

  const endVoting = async () => {
    await axios.post("/api/end-voting");
    setVotingEnded(true);
  };

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      if (decoded.admin) {
        setIsAdmin(true);
      }
    }
  }, []);

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 bg-gray-800">
      <p className="text-2xl font-bold mb-4 ">Admin</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={endVoting}
      >
        Zakończ głosowanie i pokaż wyniki
      </button>
    </div>
  );
};

export default Admin;
