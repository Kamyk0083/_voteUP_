import Admin from "../../../../Admin";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connect from "../../../../db";

export async function POST(request: NextRequest) {
  console.log("Otrzymane dane:", request.body);

  await connect();
  const credentials = await request.json();
  const { username, password } = credentials;

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
        return NextResponse.json({ success: true, token });
      } else {
        console.log("Nie jesteś adminem");
        return NextResponse.json({
          success: false,
          message: "Nie jesteś adminem",
        });
      }
    }

    return NextResponse.json({ success: false });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false });
  }
}
