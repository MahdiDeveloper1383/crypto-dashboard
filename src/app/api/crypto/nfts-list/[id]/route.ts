import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_KEY = "CG-3zw8oqXXv22GGR749vbqDrh4";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    if (!id) {
      return NextResponse.json({ error: "Missing NFT id in path" }, { status: 400 });
    }

    const url = `https://api.coingecko.com/api/v3/nfts/${encodeURIComponent(id)}`;
    const { data } = await axios.get(url, {
      headers: { "x-cg-demo-api-key": API_KEY },
      timeout: 10000,
    });

    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" },
    });
  } catch (err: unknown) {
    console.error("NFT fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch NFT" }, { status: 500 });
  }
}
