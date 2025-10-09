import { ChartData, MarketPoint } from "@/app/interfaces/chart";

export function convertToMarketPoint(chart?: ChartData): MarketPoint[] {
    if (!chart) return [];

    return chart.prices.map((p, i) => ({
      timestamp: p.timestamp,
      value: p.value ?? 0,
      date: new Date(p.timestamp).toLocaleDateString(),
      price: p.value ?? 0,
      market_caps: chart.market_caps[i]?.value ?? 0,
      total_volumes: chart.total_volumes[i]?.value ?? 0,
    }));
  }