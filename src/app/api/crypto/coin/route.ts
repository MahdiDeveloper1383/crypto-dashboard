import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_CURRENCIES = ["usd", "eur", "gbp", "jpy"];
const CG_API_KEY = "CG-3zw8oqXXv22GGR749vbqDrh4";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "Missing coin id" }, { status: 400 });
    }

    const url = new URL(req.url);
    const currency = (url.searchParams.get("currency") || "usd").toLowerCase();

    if (!ALLOWED_CURRENCIES.includes(currency)) {
      return NextResponse.json({ error: "Invalid currency" }, { status: 400 });
    }

    const cgUrl = `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(id)}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=true&vs_currency=${currency}`;

    const res = await axios.get(cgUrl, {
      headers: { "x-cg-demo-api-key": CG_API_KEY },
      timeout: 10000,
    });

    if (!res.data) {
      return NextResponse.json({ error: "Coin not found" }, { status: 404 });
    }

    const headers = {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
    };

    return NextResponse.json(res.data, { headers });
  } catch (err: unknown) {
    console.error("Error fetching coin:", err);

    if (axios.isAxiosError(err) && err.response) {
      const code = err.response.status;
      if (code === 404) {
        return NextResponse.json({ error: "Coin not found" }, { status: 404 });
      }
      return NextResponse.json({ error: "Upstream error from CoinGecko", status: code }, { status: 502 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
