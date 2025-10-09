export interface MarketPoint {
  timestamp: number;
  value: number;
}

export interface MarketChartData {
  prices: MarketPoint[];
  market_caps: MarketPoint[];
  total_volumes: MarketPoint[];
}
