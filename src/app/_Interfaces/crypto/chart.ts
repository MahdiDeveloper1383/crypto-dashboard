export type PointArray = [number, number]; 

export interface ChartData {
  prices: PointArray[];
  market_caps: PointArray[];
  total_volumes: PointArray[];
}

export interface MarketPoint {
  timestamp: number;
  price: number;
  marketCap: number;
  volume: number;
  date: string;
}
