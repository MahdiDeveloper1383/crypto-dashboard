import axios from "axios";
import { NextResponse } from "next/server";

const VS_CURRENCY = "usd";
const DAYS = 7;

export async function POST(req: Request) {
  try {
    const { coins } = await req.json();

    if (!coins || !Array.isArray(coins) || coins.length === 0) {
      return NextResponse.json({ error: "Invalid or missing 'coins' array" }, { status: 400 });
    }

    const results = await Promise.all(
      coins.map(async (coin: string) => {
        const url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart`;

        const res = await axios.get(url, {
          params: { vs_currency: VS_CURRENCY, days: DAYS },
          headers: {
            "x-cg-demo-api-key": "CG-3zw8oqXXv22GGR749vbqDrh4",
          },
        });

        return {
          id: coin,
          prices: res.data.prices,
          market_caps: res.data.market_caps,
          total_volumes: res.data.total_volumes,
        };
      })
    );

    return NextResponse.json({ coins: results });
  } catch (error) {
    console.error("Error fetching multi-coin charts:", error);
    return NextResponse.json({ error: "Failed to fetch market charts" }, { status: 500 });
  }
}
