import { IUsers } from "@/Interfaces/users/users";
import { generateToken } from "@/lib/jwt";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { identifier, password } = await req.json();

  const { data: users } = await axios(
    `${process.env.NEXT_PUBLIC_API_URL}/users`,
  );

  const user: IUsers = users.find(
    (u: IUsers) => (u.email.trim() === identifier||u.username === identifier) && u.password.trim() === password,
  );

  if (!user) {
    return NextResponse.json({ message: "Invalid" }, { status: 401 });
  }
  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });
  const response = NextResponse.json({
    success: true,
    token,
    user: {
      id: user.id,
      username: user.username,
    },
  });
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
