import { NextResponse } from "next/server";
import connect from "../../../../db";
import User from "./../../../../User";
import type { NextApiRequest } from "next";

export async function POST(request: NextApiRequest) {
  await connect();

  const { name, age } = request.body;
  const person = new User({ name, age });
  await person.save();
  console.log("Dodano osobę");
  return NextResponse.json({ succes: true });
}
