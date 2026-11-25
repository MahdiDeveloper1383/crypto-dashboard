
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // 1. Check authentication
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Get deposit amount
    const { amount } = await request.json();

    // 3. Validate amount
    if (
      typeof amount !== "number" ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      return NextResponse.json(
        { message: "Invalid deposit amount" },
        { status: 400 }
      );
    }

    // 4. Get API URL
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      throw new Error("API URL is not configured");
    }

    // 5. Get latest user data
    const { data: currentUser } = await axios.get(
      `${apiUrl}/users/${user.id}`
    );

    // 6. Calculate new balance
    const updatedBalance = currentUser.usdBalance + amount;

    // 7. Update user balance
    const { data: updatedUser } = await axios.patch(
      `${apiUrl}/users/${user.id}`,
      {
        usdBalance: updatedBalance,
      }
    );

    // 8. Return updated wallet
    return NextResponse.json({
      message: "Deposit successful",
      wallet: {
        usdBalance: updatedUser.usdBalance,
      },
    });

  } catch (error) {
    console.error("Deposit Error:", error);

    return NextResponse.json(
      { message: "Deposit failed" },
      { status: 500 }
    );
  }
}
