import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connect from "../../../db/db";
import Admin from "../../../db/schema/Admin";

export const revalidate = 1;
export async function POST(request: NextRequest, response: NextResponse) {
  await connect();
  const data = await request.json();
  const { username, password } = data;

  console.log("Dane logowania:", username, password);

  try {
    const admin = await Admin.findOne({ username: username });
    console.log("Admin znaleziony:", admin);
    if (admin && admin.password === password) {
      if (admin.admin) {
        const token = jwt.sign(
          {
            username: admin.username,
            admin: admin.admin,
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
