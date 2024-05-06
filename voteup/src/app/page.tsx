"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
// import axios from "axios";

export default function Home() {
  // const [name, setName] = useState<string>("");
  // const [age, setAge] = useState<number | undefined>(undefined);

  // const handleSubmit = async () => {
  //   console.log(name, age);
  //   try {
  //     await axios.post("/api/test", {
  //       name,
  //       age,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const { isLoaded, userId, sessionId, getToken } = useAuth();

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
        <UserButton />
      </header>
    </div>
  );
}
