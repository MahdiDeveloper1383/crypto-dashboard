"use client";
import React, { useEffect } from "react";
import { usePagination } from "@/Hooks/UsePagition";
import { UseMarket } from "@/react-query/UseMarket";
import MarketCoinstableCard from "../Cards/MarketCoinstableCard";
import Pagination from "../layout/Pagination";
import { useCoinFilterStore } from "@/zustand/UseCoinFilterStore";

export default function MarketCointable() {
  const { data: Coins, isLoading, error } = UseMarket("usd");
  const {
    filteredCoins,
    setCoins,
    search,
    sortBy,
    sortType,
    setSearch,
    setSortBy,
    setSortType
  } = useCoinFilterStore();

  useEffect(() => {
    if (Coins) setCoins(Coins.slice(0, 20));
  }, [Coins, setCoins]);
  const {
    currentItems: currentCoins,
    currentPage,
    setCurrentPage,
    totalPages,
  } = usePagination(filteredCoins, 10);

  return (
    <React.Fragment>
      <div className="mt-20 w-full h-screen max-w-[1450px] mx-auto shadow-2xl rounded-2xl overflow-x-auto  dark:bg-white">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 mb-6 px-4">
          <input
            type="text"
            placeholder="Search for a coin..."
            className="w-full sm:w-[300px] p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white dark:border-gray-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex flex-wrap justify-center sm:justify-end gap-3">
            <select
              className="p-2 border border-gray-300 rounded-xl focus:outline-none dark:bg-gray-900 dark:text-white dark:border-gray-700"
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="">All Coins</option>
              <option value="top_gainers">Top Gainers</option>
              <option value="top_losers">Top Losers</option>
              <option value="high_volume">High Volume</option>
            </select>

            <select
              className="p-2 border border-gray-300 rounded-xl focus:outline-none dark:bg-gray-900 dark:text-white dark:border-gray-700"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="market_cap_asc">Market Cap ↑</option>
              <option value="market_cap_desc">Market Cap ↓</option>
              <option value="price_asc">Price ↑</option>
              <option value="price_desc">Price ↓</option>
            </select>
          </div>
        </div>
        {isLoading && (
          <h3 className="text-6xl text-yellow-400">Is Loading...</h3>
        )}
        {error && (
          <h3 className="text-6xl text-red-500">fetching Data faild.</h3>
        )}
        {!isLoading && !error && (
          <table className="min-w-full text-sm text-gray-700 ">
            <thead className="bg-gradient-to-r from-indigo-400 to-blue-600 text-white">
              <tr>
                <th className="px-4 py-3 text-center">#</th>
                <th className="px-4 py-3 text-left">Coin</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">%24h</th>
                <th className="px-4 py-3 text-left">Market Cap</th>
                <th className="px-4 py-3 text-left">Volume</th>
              </tr>
            </thead>
            <tbody>
              {currentCoins?.map((coin, index) => (
                <MarketCoinstableCard coin={coin} index={index} key={coin.id} />
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </React.Fragment>
  );
}
