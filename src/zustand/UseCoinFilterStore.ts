import { create } from "zustand";
import { CoinMarket } from "@/Interfaces/crypto/market";

interface CoinFilterState {
  coins: CoinMarket[];
  filteredCoins: CoinMarket[];
  search: string;
  sortType: string;
  sortBy: string;

  setCoins: (coins: CoinMarket[]) => void;
  setSearch: (value: string) => void;
  setSortType: (value: string) => void;
  setSortBy: (value: string) => void;
  resetFilter: () => void;
  applyFilter: (coins?: CoinMarket[]) => void;
}

export const useCoinFilterStore = create<CoinFilterState>((set, get) => ({
  coins: [],
  filteredCoins: [],
  search: "",
  sortType: "",
  sortBy: "",

  setCoins: (coins) => {
    set({ coins });
    get().applyFilter(coins);
  },

  setSearch: (value) => {
    set({ search: value });
    get().applyFilter();
  },

  setSortType: (value) => {
    set({ sortType: value });
    get().applyFilter();
  },

  setSortBy: (value) => {
    set({ sortBy: value });
    get().applyFilter();
  },

  resetFilter: () => {
    set({ search: "", sortType: "", sortBy: "" });
    get().applyFilter();
  },

  applyFilter: (coins?: CoinMarket[]) => {
    const state = get();
    let result = [...(coins ?? state.coins)];

    const { search, sortType, sortBy } = state;

    if (search.trim()) {
      result = result.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortType === "top_gainers") {
      result.sort(
        (a, b) =>
          b.market_cap_change_percentage_24h -
          a.market_cap_change_percentage_24h
      );
    } else if (sortType === "top_losers") {
      result.sort(
        (a, b) =>
          a.market_cap_change_percentage_24h -
          b.market_cap_change_percentage_24h
      );
    } else if (sortType === "high_volume") {
      result.sort((a, b) => b.total_volume - a.total_volume);
    }

    if (sortBy === "market_cap_desc") {
      result.sort((a, b) => b.market_cap - a.market_cap);
    } else if (sortBy === "market_cap_asc") {
      result.sort((a, b) => a.market_cap - b.market_cap);
    } else if (sortBy === "price_desc") {
      result.sort((a, b) => b.current_price - a.current_price);
    } else if (sortBy === "price_asc") {
      result.sort((a, b) => a.current_price - b.current_price);
    }

    set({ filteredCoins: result });
  },
}));
