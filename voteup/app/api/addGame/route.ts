import connect from "../../../db/db";
import Game from "../../../db/schema/Game";
import { NextResponse } from "next/server";

export const revalidate = 1;
export async function POST(request: Request) {
  await connect();
  const requestBody = await request.text();
  if (!requestBody) {
    return NextResponse.json(
      { error: "Brak danych w żądaniu" },
      { status: 400 }
    );
  }
  const { nazwa, opis, baner, strona, typ, data } = JSON.parse(requestBody);
  const game = new Game({ nazwa, opis, baner, strona, typ, data });
  await game.save();
  console.log("dodano gre", opis, baner, strona, typ, data);
  return NextResponse.json({ message: "Gra została dodana!" });
}
