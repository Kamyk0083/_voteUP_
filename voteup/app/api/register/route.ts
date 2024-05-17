import connect from "../../../db/db";
import Firma from "../../../db/schema/Firma";
import { NextResponse } from "next/server";

export const revalidate = 1;
export async function POST(request: Request) {
  await connect();
  try {
    const requestBody = await request.text();
    if (!requestBody) {
      return NextResponse.json(
        { error: "Brak danych w żądaniu" },
        { status: 400 }
      );
    }
    const { nazwa, strona, email, haslo, tanyKlucz, admin } =
      JSON.parse(requestBody);
    if (tanyKlucz !== process.env.SECRET_KEY) {
      return NextResponse.json(
        { error: "Niepoprawny tajny klucz" },
        { status: 401 }
      );
    }
    const firma = new Firma({ nazwa, strona, email, haslo, admin });
    await firma.save();
    console.log("dodano firme", nazwa, strona, email, haslo);
    return NextResponse.json({ message: "Firma została dodana!" });
  } catch (error) {
    console.error("Error processing request", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
