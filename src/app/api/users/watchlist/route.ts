import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import axios from "axios";
import { IUser } from "@/Interfaces/users/users";

export async function POST(req: Request) {
  try {
    const { coinId } = await req.json();

    if (!coinId || typeof coinId !== "string") {
      return NextResponse.json(
        { message: "coinId is required" },
        { status: 400 }
      );
    }

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const isInWatchlist = user.watchlist.includes(coinId);

    const watchlist = isInWatchlist
      ? user.watchlist.filter((id: string) => id !== coinId)
      : [...user.watchlist, coinId];

    const { data: updatedUser } = await axios.patch<IUser>(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`,
      {
        watchlist,
      }
    );

    return NextResponse.json({
      success: true,
      watchlisted: !isInWatchlist,
      watchlist: updatedUser.watchlist,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}