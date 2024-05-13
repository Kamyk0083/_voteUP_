"use client";

import { JwtPayload } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
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
      <div>
        <Link
          href={"/sign-in"}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 sm:py-2 px-3 sm:px-4 rounded mr-2"
        >
          Sign In
        </Link>
        <Link
          href={"/sign-up"}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 sm:py-2 px-3 sm:px-4 rounded"
        >
          Sign Up
        </Link>
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
