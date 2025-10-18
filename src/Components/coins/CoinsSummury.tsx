"use client";
import { UseMarket } from "@/react-query/UseMarket";
import Image from "next/image";
import React from "react";

export default function CoinsSummury() {
  const { data: Coins } = UseMarket();
  return (
    <div className="mt-14 flex flex-col items-center mr-auto ml-auto min-w-[648px] sm:w-[1300px] min-h-[800px] rounded-2xl shadow-2xl gap-8 p-6">
      <h3 className="text-6xl font-bold text-gray-700 text-shadow-md text-shadow-gray-800 mb-6 text-center">
        Summury Coins
      </h3>

      <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
        <input
          type="text"
          className="border border-gray-400 w-full sm:w-[300px] p-2 rounded-2xl bg-white text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search Coin..."
        />
        <div className="flex flex-wrap justify-center sm:justify-end gap-8">
          <select className="p-2 border border-gray-800 rounded-xl focus:outline-none dark:bg-gray-900  dark:text-white dark:border-gray-700">
            <option value="">All</option>
            <option value="">Top Gainers</option>
            <option value="">All</option>
            <option value="">All</option>
          </select>
          <select className="p-2 border border-gray-800 rounded-xl focus:outline-none dark:bg-gray-900 dark:text-white dark:border-gray-700">
            <option value="">Market Up ↑</option>
            <option value="">Market Down ↓</option>
            <option value="">Price ↑</option>
            <option value="">Price ↓</option>
          </select>
        </div>
      </div>
      <table className="min-w-full h-screen">
        <thead className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white text-sm ">
          <tr>
            <th className="px-4 py-3 text-center">#</th>
            <th className="px-4 py-3 text-left">Coin</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">%24h</th>
            <th className="px-4 py-3 text-left">Market Cap</th>
            <th className="px-4 py-3 text-left">Markt Rank</th>
            <th className="px-4 py-3 text-left">Volume</th>
            <th className="px-4 py-3 text-left">Total Supply</th>
          </tr>
        </thead>
        <tbody>
          {Coins?.map((coin, index) => (
            <tr className="text-xl cursor-pointer hover:bg-gray-200">
              <td className="px-4 py-3 text-center">{index + 1}</td>
              <td className="px-4 py-3 flex gap-2 text-left">
                <Image
                  src={coin.image}
                  alt="coin"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <span className="font-semibold text-2xl">{coin.name} </span>
                <span className="uppercase text-gray-600 text-xs">
                  {coin.symbol}
                </span>
              </td>
              <td className="px-4 py-3 text-left">
                ${coin.current_price.toFixed(2)}
              </td>
              <td
                className={`px-4 py-3 ${
                  coin.market_cap_change_percentage_24h < 0
                    ? "text-red-600"
                    : "text-green-400"
                }`}
              >
                %{coin.market_cap_change_percentage_24h?.toFixed(2) ?? "0.0"}
              </td>
              <td className="px-4 py-3 text-left">${coin.market_cap}</td>
              <td className="px-4 py-3 text-left">{coin.market_cap_rank}</td>
              <td className="px-4 py-3 text-left">${coin.total_volume}</td>
              <td className="px-4 py-3 text-left">
                {coin.total_supply?.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
