"use client";

import { useUser } from "@clerk/nextjs";
import Header from "../components/Header";
import SignInHeader from "../components/SignInHeader";
import Game from "../components/Game";
import SignInGame from "../components/SignInGame";

export default function Home() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
      <div className="main-container">
        <Header />
        <Game />
      </div>
    );
  }

  return (
    <div className="main-container">
      <SignInHeader />
      <SignInGame />
    </div>
  );
}
