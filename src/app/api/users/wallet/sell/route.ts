import { NextResponse } from "next/server";
import axios from "axios";
import { getCurrentUser } from "@/lib/auth";
import { IUser } from "@/Interfaces/users/users";

export async function POST(req: Request) {
  try {
    // 1. Authentication
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2. Get request data
    const { coinId, amount } = await req.json();

    if (
      typeof coinId !== "string" ||
      !coinId.trim() ||
      typeof amount !== "number" ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      return NextResponse.json(
        { message: "Invalid selling information" },
        { status: 400 },
      );
    }

    // 3. Get latest user data
    const { data: currentUser } = await axios.get<IUser>(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`,
    );

    // 4. Find user's coin balance
    const balances = currentUser.balances ?? [];

    const existingCoin = balances.find((item) => item.coinId === coinId);

    if (!existingCoin) {
      return NextResponse.json(
        { message: "You don't own this coin" },
        { status: 400 },
      );
    }

    if (!Number.isFinite(existingCoin.amount) || existingCoin.amount < amount) {
      return NextResponse.json(
        { message: "Insufficient coin balance" },
        { status: 400 },
      );
    }

    // 5. Get current coin price from CoinGecko
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
      },
    );

    const coinPrice = coin.market_data?.current_price?.usd;

    if (
      typeof coinPrice !== "number" ||
      !Number.isFinite(coinPrice) ||
      coinPrice <= 0
    ) {
      return NextResponse.json(
        { message: "Unable to get coin price" },
        { status: 502 },
      );
    }

    // 6. Calculate selling value
    const total = amount * coinPrice;
    // 7. Calculate remaining investment and coin amount
    const costToRemove =
      (amount / existingCoin.amount) * (existingCoin.investedUsd ?? 0);

    const remainingAmount = existingCoin.amount - amount;

    const remainingInvestedUsd = Math.max(
      0,
      (existingCoin.investedUsd ?? 0) - costToRemove,
    );

    // 8. Update coin balance
    const updatedBalances = balances
      .map((item) =>
        item.coinId === coinId
          ? {
              ...item,
              amount: remainingAmount,
              investedUsd: remainingInvestedUsd,
            }
          : item,
      )
      .filter((item) => item.amount > 1e-12);

    // 9. Add selling value to USD balance
    const newUsdBalance = currentUser.usdBalance + total;

    // 10. Save updated wallet
    const { data: updatedUser } = await axios.patch<IUser>(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${currentUser.id}`,
      {
        usdBalance: newUsdBalance,
        balances: updatedBalances,
      },
    );

    // 11. Return updated wallet
    return NextResponse.json({
      success: true,
      message: "Sale completed successfully",

      sale: {
        coinId,
        symbol: existingCoin.symbol,
        quantity: amount,
        price: coinPrice,
        total,
      },

      wallet: {
        usdBalance: updatedUser.usdBalance,
        balances: updatedUser.balances,
      },
    });
  } catch (error) {
    console.error("Sell Coin API Error:", error);

    return NextResponse.json({ message: "Sale failed" }, { status: 500 });
  }
}
