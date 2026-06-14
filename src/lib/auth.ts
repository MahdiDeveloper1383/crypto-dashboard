import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import axios from "axios";
import { IUsers } from "@/Interfaces/users/users";
import { JwtPayload } from "jsonwebtoken";

type MyToken = JwtPayload & {
  id: string;
  email?: string;
  role?: string;
};

export async function getCurrentUser() {
    const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const payload = verifyToken(token) as MyToken;

    const { data: users } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users`
    );

    const user = users.find(
      (u: IUsers) => u.id === payload.id
    );

    return user;
  } catch {
    return null;
  }
}