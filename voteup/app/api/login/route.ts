import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connect from "../../../db/db";
import Firma from "../../../db/schema/Firma";

export const revalidate = 1;
export async function POST(request: NextRequest, response: NextResponse) {
  await connect();
  const data = await request.json();
  const { email, password } = data;

  console.log("Dane logowania:", email, password);

  try {
    const firma = await Firma.findOne({ email: email });
    console.log("Firma znaleziona:", firma);
    if (firma && firma.haslo === password) {
      if (firma.admin) {
        const token = jwt.sign(
          {
            email: firma.email,
            admin: firma.admin,
          },
          "voteup"
        );
        console.log("Wygenerowany token:", token);
        return new NextResponse(JSON.stringify({ success: true, token }));
      } else {
        console.log("Nie jesteś adminem");
        return new NextResponse(
          JSON.stringify({ success: false, message: "Nie jesteś adminem" })
        );
      }
    }

    return new NextResponse(JSON.stringify({ success: false }));
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ success: false }));
  }
}
