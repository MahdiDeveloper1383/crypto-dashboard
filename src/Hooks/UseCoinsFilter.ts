import { CoinMarket } from "@/Interfaces/crypto/market";
import { useMemo, useState } from "react";

export function useCoinFilter(coins: CoinMarket[]) {
  const [filter, setFilter] = useState({
    search: "",
    sortType: "",
    sortBy: "",
  });

  const filteredCoins = useMemo(() => {
    if (!coins) return [];

    let result = [...coins];


    if (filter.search.trim()) {
      result = result.filter((coin) =>
        coin.name.toLowerCase().includes(filter.search.toLowerCase())
      );
    }

    if (filter.sortType === "top_gainers") {
      result.sort(
        (a, b) => b.market_cap_change_percentage_24h - a.market_cap_change_percentage_24h
      );
    } else if (filter.sortType === "top_losers") {
      result.sort(
        (a, b) => a.market_cap_change_percentage_24h - b.market_cap_change_percentage_24h
      );
    } else if (filter.sortType === "high_volume") {
      result.sort((a, b) => b.total_volume - a.total_volume);
    }

    if (filter.sortBy === "market_cap_desc") {
      result.sort((a, b) => b.market_cap - a.market_cap);
    } else if (filter.sortBy === "market_cap_asc") {
      result.sort((a, b) => a.market_cap - b.market_cap);
    } else if (filter.sortBy === "price_desc") {
      result.sort((a, b) => b.current_price - a.current_price);
    } else if (filter.sortBy === "price_asc") {
      result.sort((a, b) => a.current_price - b.current_price);
    }

    return result;
  }, [coins, filter]);

  return { filteredCoins, filter, setFilter };
}
