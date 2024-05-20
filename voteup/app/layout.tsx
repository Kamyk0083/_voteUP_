import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { VotingProvider } from "./context/VotingContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "voteUP",
  description: "Zagłosuj na swoją ulubioną gre",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <VotingProvider>
            <main>{children}</main>
          </VotingProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
