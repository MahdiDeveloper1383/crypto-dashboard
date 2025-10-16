"use client";
import { useCoinFilter } from "@/Hooks/UseCoinsFilter";
import { usePagination } from "@/Hooks/UsePagition";
import { UseMarket } from "@/react-query/UseMarket";
import Image from "next/image";
import React from "react";

export default function MarketCointable() {
  const { data: Coins } = UseMarket();
  const { filteredCoins, filter, setFilter } = useCoinFilter(Coins ?? []);
  const {
    currentItems: currentCoins,
    currentPage,
    setCurrentPage,
    totalPages,
  } = usePagination(filteredCoins, 10);
  if (!Coins) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="mt-20 w-full h-screen max-w-[1450px] mx-auto shadow-2xl rounded-2xl overflow-x-auto  dark:bg-white">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 mb-6 px-4">
        <input
          type="text"
          placeholder="Search for a coin..."
          className="w-full sm:w-[300px] p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white dark:border-gray-700"
          value={filter.search}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "") {
              setFilter({ search: "", sortBy: "", sortType: "" });
            } else {
              setFilter({ ...filter, sortType: value });
            }
          }}
        />

        <div className="flex flex-wrap justify-center sm:justify-end gap-3">
          <select
            className="p-2 border border-gray-300 rounded-xl focus:outline-none dark:bg-gray-900 dark:text-white dark:border-gray-700"
            value={filter.sortType}
            onChange={(e) => {
              const value = e.target.value;

              if (value === "") {
                setFilter({ search: "", sortBy: "", sortType: "" });
              } else {
                setFilter({ ...filter, sortType: value });
              }
            }}
          >
            <option value="">All Coins</option>
            <option value="top_gainers">Top Gainers</option>
            <option value="top_losers">Top Losers</option>
            <option value="high_volume">High Volume</option>
          </select>

          <select
            className="p-2 border border-gray-300 rounded-xl focus:outline-none dark:bg-gray-900 dark:text-white dark:border-gray-700"
            value={filter.sortBy}
            onChange={(e) => setFilter({ ...filter, sortBy: e.target.value })}
          >
            <option value="market_cap_desc">Market Cap ↓</option>
            <option value="market_cap_asc">Market Cap ↑</option>
            <option value="price_desc">Price ↓</option>
            <option value="price_asc">Price ↑</option>
          </select>
        </div>
      </div>

      <table className="min-w-full text-sm text-gray-700 ">
        <thead className=" bg-gradient-to-r from-indigo-400 to-blue-600 text-white">
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
            <tr
              key={coin.id}
              className=" hover:bg-gray-50 transition text-xl font-normal"
            >
              <td className="px-4 py-3 text-center">{index + 1}</td>
              <td className="px-4 py-3 flex items-center gap-2">
                <Image
                  src={coin.image}
                  className="rounded-full"
                  alt="coin_symbol"
                  width={30}
                  height={30}
                />
                <span className="font-semibold text-2xl">{coin.name} </span>
                <span className="uppercase text-gray-600 text-xs">
                  {coin.symbol}
                </span>
              </td>
              <td className="px-4 py-3">${coin.current_price.toFixed(2)}</td>
              <td
                className={`px-4 py-3 ${
                  coin.market_cap_change_percentage_24h < 0
                    ? "text-red-600"
                    : "text-green-400"
                }`}
              >
                %{coin.market_cap_change_percentage_24h?.toFixed(2) ?? "0.0"}
              </td>
              <td className="px-4 py-3">${coin.market_cap}</td>
              <td className="px-4 py-3">${coin.total_volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded cursor-pointer ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
