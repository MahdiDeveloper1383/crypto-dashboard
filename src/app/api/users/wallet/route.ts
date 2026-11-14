
import { NextResponse } from "next/server";
import axios from "axios";
import { getCurrentUser } from "@/lib/auth";
import { IUser } from "@/Interfaces/users/users";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { data: currentUser } = await axios.get<IUser>(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`
    );

    return NextResponse.json({
      success: true,
      wallet: {
        walletAddress: currentUser.walletAddress,
        usdBalance: currentUser.usdBalance,
        balances: currentUser.balances,
      },
    });

  } catch (error) {
    console.error("Wallet API Error:", error);

    return NextResponse.json(
      { message: "Failed to fetch wallet information" },
      { status: 500 }
    );
  }
}
