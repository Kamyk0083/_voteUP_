import Game from "../../../../Game";
import connect from "../../../../db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await connect();
  const games = await Game.find({});
  return NextResponse.json({ success: true, games });
}
