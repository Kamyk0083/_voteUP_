import Game from "../../../db/schema/Game";
import connect from "../../../db/db";
import { NextResponse } from "next/server";

export const revalidate = 1;
export async function GET(request: Request) {
  await connect();
  const games = await Game.find({}).sort({ votes: -1 });
  return NextResponse.json({ success: true, games });
}
