import { NextResponse } from "next/server";
import connect from "../../../../db";
import Vote from "../../../../Vote";

export const revalidate = 1;
export async function POST(request: Request) {
  await connect();
  const { name, email, vote } = await request.json();
  const usersVote = new Vote({ name, email, vote });
  await usersVote.save();
  console.log("Oddano głos", name, email, vote);
  return NextResponse.json({ success: true });
}
