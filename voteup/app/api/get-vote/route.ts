import Vote from "../../../db/schema/Vote";
import connect from "../../../db/db";
import { NextResponse } from "next/server";

export const revalidate = 1;
export async function GET() {
  await connect();
  const votes = await Vote.find({});
  return NextResponse.json({ success: true, votes });
}
