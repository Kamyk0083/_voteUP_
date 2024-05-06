import { NextResponse } from "next/server";
import connect from "../../../../db";
import User from "./../../../../User";

export async function POST(request: Request) {
  await connect();
  const { name, age } = await request.json();
  const person = new User({ name, age });
  await person.save();
  console.log("Dodano osobę", name, age);
  return NextResponse.json({ success: true });
}
