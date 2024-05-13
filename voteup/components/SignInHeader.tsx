"use client";

import { UserButton } from "@clerk/nextjs";
import { JwtPayload } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function Header() {
  const { user } = useUser();

  const [loggedInUser, setLoggedInUser] = useState<CustomJwtPayload | null>(
    null
  );

  interface CustomJwtPayload extends JwtPayload {
    admin?: boolean;
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      setLoggedInUser(decoded);
    }
  }, []);

  return (
    <header className="bg-gray-800 text-white py-2 sm:py-4 px-3 sm:px-6 flex justify-between items-center">
      <div className="flex font-bold uppercase items-center">
        <p className="text-sm sm:text-lg">vote</p>
        <p className="text-green-500 text-xl sm:text-2xl">UP</p>
      </div>
      <p className="text-white">
        Witaj, {user?.firstName} na aplikacja do głosowania
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
  );
}
