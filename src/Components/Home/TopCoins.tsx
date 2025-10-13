"use client";
import { UseChart } from "@/Hooks/react-query/UseCharts";
import { UseMarket } from "@/Hooks/react-query/UseMarket";
import { convertToMarketPoint } from "@/utils/CovertChart";
import React from "react";
import Chart from "../Chart/Chart";


export default function TopCoins() {
  const { data: coins, error, isLoading } = UseMarket();
  const chart_coins = ["bitcoin", "ethereum", "solana"];

  const { data: charts } = UseChart(chart_coins);
  const TopGainers = coins
    ?.sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    )
    .slice(0, 12);
  const TopLosers = coins
    ?.sort(
      (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h
    )
    .slice(0, 12);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 p-8">
      {error && (
        <h1 className="text-4xl text-red-500">Error fetching users.</h1>
      )}
      {isLoading && (
        <h1 className="text-4xl  text-yellow-400">Is Loading...</h1>
      )}
      {!error && !isLoading && (
        <>
          <div className="bg-linear-to-r from-green-500 to-green-600 dark:bg-gray-800 rounded-2xl p-5 shadow-lg hover:shadow-xl transition">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
              Top Gainers (24h)
            </h3>
            <ul className="space-y-2">
              {TopGainers?.map((coin) => (
                <li key={coin.id} className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    {coin.name} ({coin.symbol})
                  </span>
                  <span className="text-green-500 font-bold">
                    %{coin.price_change_percentage_24h?.toFixed(2) ?? "0.00"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-linear-to-r from-red-600  to-red-500 dark:bg-gray-800 rounded-2xl p-5 shadow-lg hover:shadow-xl transition">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
              Top Losers (24h)
            </h3>
            <ul className="space-y-2">
              {TopLosers?.map((coin) => (
                <li key={coin.id} className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    {coin.name} ({coin.symbol})
                  </span>
                  <span className="text-red-700 font-bold">
                    %{coin.price_change_percentage_24h?.toFixed(2) ?? "0.00"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-linear-to-r from-white to-gray-500 dark:bg-gray-800 rounded-2xl p-5 shadow-lg hover:shadow-xl transition flex flex-col">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
              Global Market Cap
            </h3>

            <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400 gap-5">
              {charts?.coins.map((chart, index) => (
                <div className="w-full" key={index}>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 text-center">
                    {chart_coins[index].toUpperCase()}
                  </h4>
                  <Chart
                    key={index}
                    data={convertToMarketPoint(chart)}
                    showMarketCap
                    height={300}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <div></div>
    </div>
  );
}
