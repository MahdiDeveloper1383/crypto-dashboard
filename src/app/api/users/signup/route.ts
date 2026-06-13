import { IUsers } from "@/Interfaces/users/users";
import { generateToken } from "@/lib/jwt";
import axios from "axios";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export async function POST(req: Request) {
  const { email, username, password, firstname, lastname } = await req.json();
  const hashpassword = await bcrypt.hash(password, 10);
  const { data: users } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/users`,
  );

  const existinguser = users.find(
    (u: IUsers) =>
      u.username.toLocaleLowerCase().trim() ===
        username.toLocaleLowerCase().trim() ||
      u.email.toLocaleLowerCase().trim() === email.toLocaleLowerCase().trim(),
  );
  if (existinguser) {
    return NextResponse.json(
      { message: "User already exits" },
      { status: 400 },
    );
  }
  const { data: newuser } = await axios.post<IUsers>(
    `${process.env.NEXT_PUBLIC_API_URL}/users`,
    {
      username,
      firstname,
      lastname,
      email,
      password: hashpassword,
      role: "user",
      watchlist: [],
      usdBalance: 1000,
      walletAddress: crypto.randomUUID(),
      btcBalance: 0,
      ethBalance: 0,
      createdAt: new Date().toISOString(),
    },
  );
  const token = generateToken({
    id: newuser.id,
    email: newuser.email,
    role: newuser.role,
  });
  const response = NextResponse.json({
    success: true,
    user: {
      id: newuser.id,
      username: newuser.username,
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
