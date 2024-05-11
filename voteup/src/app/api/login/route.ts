import Admin from "../../../../Admin";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import connect from "../../../../db";

export async function POST(request: NextApiRequest, response: NextApiResponse) {
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
        return response.json({ success: true, token });
      } else {
        console.log("Nie jesteś adminem");
        return response.json({
          success: false,
          message: "Nie jesteś adminem",
        });
      }
    }

    return response.json({ success: false });
  } catch (error) {
    console.log(error);
    return response.json({ success: false });
  }
}
