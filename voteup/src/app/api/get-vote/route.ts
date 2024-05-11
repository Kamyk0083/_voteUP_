import Vote from "../../../../Vote";
import connect from "../../../../db";
import { NextResponse } from "next/server";

export async function GET() {
  await connect();
  const votes = await Vote.find({});
  return NextResponse.json({ success: true, votes });
}
