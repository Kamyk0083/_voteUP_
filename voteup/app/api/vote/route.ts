import { NextResponse } from "next/server";
import connect from "../../../db/db";
import Vote from "../../../db/schema/Vote";
import Game from "../../../db/schema/Game";

export const revalidate = 1;
export async function POST(request: Request) {
  await connect();
  const { name, email, vote } = await request.json();
  const usersVote = new Vote({ name, email, vote });
  await usersVote.save();
  console.log("Oddano głos", name, email, vote);

  await Game.findOneAndUpdate({ nazwa: vote }, { $inc: { votes: 1 } });

  return NextResponse.json({ success: true });
}
