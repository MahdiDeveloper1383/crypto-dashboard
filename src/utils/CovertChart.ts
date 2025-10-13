import { MarketPoint, ChartData } from "@/Interfaces/crypto/chart";

export function convertToMarketPoint(chart?: ChartData): MarketPoint[] {
  if (!chart) return [];

  return chart.prices.map((p, i) => ({
    timestamp: p[0],
    date: new Date(p[0]).toLocaleDateString(),
    price: p[1] ?? 0,
    marketCap: chart.market_caps[i]?.[1] ?? 0,
    volume: chart.total_volumes[i]?.[1] ?? 0,
  }));
}
