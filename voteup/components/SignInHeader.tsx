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
    <header className="bg-gray-800 text-white py-2 sm:py-4 px-3 sm:px-6 flex flex-wrap justify-center sm:justify-between items-center">
      <div className="flex items-center font-bold uppercase">
        <p className="text-sm sm:text-lg">vote</p>
        <p className="text-green-500 text-xl sm:text-2xl ml-1">UP</p>
      </div>
      <p className="text-sm sm:text-base text-white my-2 sm:my-0 flex-1 text-center sm:text-center">
        Witaj, {user?.firstName} na aplikacja do głosowania
      </p>
      <div className="flex items-center">
        <UserButton />
        {loggedInUser?.admin && (
          <Link
            href={"/admin"}
            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-1 sm:py-2 px-3 sm:px-4 rounded ml-2"
          >
            Admin
          </Link>
        )}
      </div>
    </header>
  );
}
