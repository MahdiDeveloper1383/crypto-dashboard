import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const ALLOWED = ["usd", "eur", "gbp", "jpy"];
const COINS = "bitcoin,ethereum,binancecoin,cardano";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);

    const currency = url.searchParams.get("currency") || "usd";
    if (!ALLOWED.includes(currency)) {
      return NextResponse.json({ error: "Invalid currency" }, { status: 400 });
    }

    const category = "layer-1";
    const priceChange = "1h";

    const cgUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${COINS}&category=${category}&price_change_percentage=${priceChange}`;

    const res = await axios(cgUrl, {
      headers: {
        "x-cg-demo-api-key": "CG-3zw8oqXXv22GGR749vbqDrh4"
      }
    });

    if (!res) throw new Error("Failed to fetch from CoinGecko");


    return NextResponse.json(res.data);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch market data" }, { status: 500 });
  }
}
