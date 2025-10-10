export interface CoinItemData {
  price: number;
  price_btc: string;
  price_change_percentage_24h: Record<string, number>;
  market_cap: string;
  market_cap_btc: string;
  total_volume: string;
  total_volume_btc: string;
  sparkline: string;
  content?: {
    title: string;
    description: string;
  } | null;
}

export interface CoinItem {
  id: string;
  coin_id: number;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  small: string;
  large: string;
  slug: string;
  price_btc: number;
  score: number;
  data: CoinItemData;
}

export interface Coin {
  item: CoinItem;
}

export interface NFTData {
  floor_price: string;
  floor_price_in_usd_24h_percentage_change: string;
  h24_volume: string;
  h24_average_sale_price: string;
  sparkline: string;
  content?: {
    title: string;
    description: string;
  } | null;
}

export interface NFT {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
  nft_contract_id: number;
  native_currency_symbol: string;
  data: NFTData;
}

export interface CategoryData {
  market_cap: number;
  market_cap_btc: number;
  total_volume: number;
  total_volume_btc: number;
  market_cap_change_percentage_24h: Record<string, number>;
  sparkline: string;
}

export interface Category {
  id: number;
  name: string;
  market_cap_1h_change: number;
  slug: string;
  coins_count: number;
  data: CategoryData;
}

export interface CryptoAPIResponse {
  coins: Coin[];
  nfts: NFT[];
  categories: Category[];
}
