import Admin from "../../../../Admin";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import connect from "../../../../db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await connect();
  const credentials = request.body;
  const { username, password } = credentials;

  try {
    const cfg = { username, password };
    const admin = await Admin.findOne(cfg);
    if (admin) {
      const token = jwt.sign(
        {
          password: admin.password,
          username: admin.username,
        },
        "voteup"
      );

      return NextResponse.json({ success: true, token });
    }

    return NextResponse.json({ success: false });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false });
  }
}
