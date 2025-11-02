export interface NFTCollection {
  id: string;
  contract_address: string;
  asset_platform_id: string;
  name: string;
  symbol: string;

  image: {
    small: string;
    small_2x: string;
  };

  banner_image: string;
  description: string;

  native_currency: string;
  native_currency_symbol: string;

  market_cap_rank: number;

  floor_price: {
    native_currency: number;
    usd: number;
  };

  market_cap: {
    native_currency: number;
    usd: number;
  };

  volume_24h: {
    native_currency: number;
    usd: number;
  };

  floor_price_in_usd_24h_percentage_change: number;

  floor_price_24h_percentage_change: {
    usd: number;
    native_currency: number;
  };

  market_cap_24h_percentage_change: {
    usd: number;
    native_currency: number;
  };

  volume_24h_percentage_change: {
    usd: number;
    native_currency: number;
  };

  number_of_unique_addresses: number;
  number_of_unique_addresses_24h_percentage_change: number;
  volume_in_usd_24h_percentage_change: number;

  total_supply: number;
  one_day_sales: number;
  one_day_sales_24h_percentage_change: number;
  one_day_average_sale_price: number;
  one_day_average_sale_price_24h_percentage_change: number;

  links: {
    homepage: string;
    twitter: string;
    discord: string;
  };

  floor_price_7d_percentage_change: {
    usd: number;
    native_currency: number;
  };

  floor_price_14d_percentage_change: {
    usd: number;
    native_currency: number;
  };

  floor_price_30d_percentage_change: {
    usd: number;
    native_currency: number;
  };

  floor_price_60d_percentage_change: {
    usd: number;
    native_currency: number;
  };

  floor_price_1y_percentage_change: {
    usd: number;
    native_currency: number;
  };

  explorers: {
    name: string;
    link: string;
  }[];

  user_favorites_count: number;

  ath: {
    native_currency: number;
    usd: number;
  };

  ath_change_percentage: {
    native_currency: number;
    usd: number;
  };

  ath_date: {
    native_currency: string;
    usd: string;
  };
}
