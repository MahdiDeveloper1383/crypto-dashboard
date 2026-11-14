
import { NextResponse } from "next/server";
import axios from "axios";
import { getCurrentUser } from "@/lib/auth";
import { IUser } from "@/Interfaces/users/users";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { coinId, usdAmount } = await req.json();

    if (
      typeof coinId !== "string" ||
      !coinId.trim() ||
      typeof usdAmount !== "number" ||
      !Number.isFinite(usdAmount) ||
      usdAmount <= 0
    ) {
      return NextResponse.json(
        { message: "Invalid purchase information" },
        { status: 400 }
      );
    }

    const { data: currentUser } = await axios.get<IUser>(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`
    );

    if (currentUser.usdBalance < usdAmount) {
      return NextResponse.json(
        { message: "Insufficient balance" },
        { status: 400 }
      );
    }

    const { data: coin } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(coinId)}`,
      {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: false,
        },
      }
    );

    const coinPrice = coin.market_data?.current_price?.usd;
    const symbol = coin.symbol?.toLowerCase();

    if (
      typeof coinPrice !== "number" ||
      !Number.isFinite(coinPrice) ||
      coinPrice <= 0 ||
      !symbol
    ) {
      return NextResponse.json(
        { message: "Unable to get coin price" },
        { status: 502 }
      );
    }

    const quantity = usdAmount / coinPrice;

    const balances = [...(currentUser.balances ?? [])];

    const existingCoin = balances.find(
      (item) => item.coinId === coinId
    );

    if (existingCoin) {
      existingCoin.amount += quantity;
    } else {
      balances.push({
        coinId,
        symbol,
        amount: quantity,
      });
    }

    const newUsdBalance = currentUser.usdBalance - usdAmount;

    const { data: updatedUser } = await axios.patch<IUser>(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${currentUser.id}`,
      {
        usdBalance: newUsdBalance,
        balances,
      }
    );

    return NextResponse.json({
      success: true,
      message: "Purchase completed successfully",
      purchase: {
        coinId,
        symbol,
        quantity,
        price: coinPrice,
        total: usdAmount,
      },
      wallet: {
        usdBalance: updatedUser.usdBalance,
        balances: updatedUser.balances,
      },
    });

  } catch (error) {
    console.error("Buy Coin API Error:", error);

    return NextResponse.json(
      { message: "Purchase failed" },
      { status: 500 }
    );
  }
}
