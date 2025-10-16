"use client";
import { UseMarket } from "@/Hooks/react-query/UseMarket";
import Image from "next/image";
import React, { useState } from "react";

export default function MarketCointable() {
  const { data: Coins } = UseMarket();
  const [CurrentPage, serCurrentPage] = useState(1);
  const ItemPerPage = 10;
  const indexofLastProduct = ItemPerPage * CurrentPage;
  const indexofFirstProduct = indexofLastProduct - ItemPerPage;
  const [Filter, setFilter] = useState({
    search: "",
    sortType: "",
    sortBy: "",
  });
  let filteredCoins = Coins?.filter((coin) =>
    coin.name.toLowerCase().includes(Filter.search.toLowerCase())
  );
  if (Filter.sortType === "top_gainers") {
    filteredCoins = [...(filteredCoins ?? [])].sort(
      (a, b) =>
        b.market_cap_change_percentage_24h - a.market_cap_change_percentage_24h
    );
  } else if (Filter.sortType === "top_losers") {
    filteredCoins = [...(filteredCoins ?? [])].sort(
      (a, b) =>
        a.market_cap_change_percentage_24h - b.market_cap_change_percentage_24h
    );
  } else if (Filter.sortType === "high_volume") {
    filteredCoins = [...(filteredCoins ?? [])].sort(
      (a, b) => b.total_volume - a.total_volume
    );
  }
  if (Filter.sortBy === "market_cap_desc") {
    filteredCoins = [...(filteredCoins ?? [])].sort(
      (a, b) => a.market_cap - b.market_cap
    );
  } else if (Filter.sortBy === "market_cap_asc") {
    filteredCoins = [...(filteredCoins ?? [])].sort(
      (a, b) => b.market_cap - a.market_cap
    );
  } else if (Filter.sortBy === "price_desc") {
    filteredCoins = [...(filteredCoins ?? [])].sort(
      (a, b) => a.current_price - b.current_price
    );
  } else if (Filter.sortBy === "price_asc") {
    filteredCoins = [...(filteredCoins ?? [])].sort(
      (a, b) => b.current_price - a.current_price
    );
  }
  const CurrentCoins = filteredCoins?.slice(
    indexofFirstProduct,
    indexofLastProduct
  );
  if (!Coins) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="mt-20 w-full h-screen max-w-[1450px] mx-auto shadow-2xl rounded-2xl overflow-x-auto  dark:bg-white">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 mb-6 px-4">
        <input
          type="text"
          placeholder="Search for a coin..."
          className="w-full sm:w-[300px] p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white dark:border-gray-700"
          value={Filter.search}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "") {
              setFilter({ search: "", sortBy: "", sortType: "" });
            } else {
              setFilter({ ...Filter, sortType: value });
            }
          }}
        />

        <div className="flex flex-wrap justify-center sm:justify-end gap-3">
          <select
            className="p-2 border border-gray-300 rounded-xl focus:outline-none dark:bg-gray-900 dark:text-white dark:border-gray-700"
            value={Filter.sortType}
            onChange={(e) => setFilter({ ...Filter, sortType: e.target.value })}
          >
            <option value="">All Coins</option>
            <option value="top_gainers">Top Gainers</option>
            <option value="top_losers">Top Losers</option>
            <option value="high_volume">High Volume</option>
          </select>

          <select
            className="p-2 border border-gray-300 rounded-xl focus:outline-none dark:bg-gray-900 dark:text-white dark:border-gray-700"
            value={Filter.sortBy}
            onChange={(e) => setFilter({ ...Filter, sortBy: e.target.value })}
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
          {CurrentCoins?.map((coin, index) => (
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
        {Array.from(
          { length: Math.ceil((Coins?.length ?? 0) / ItemPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => serCurrentPage(i + 1)}
              className={`px-3 py-1 rounded cursor-pointer ${
                CurrentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}
