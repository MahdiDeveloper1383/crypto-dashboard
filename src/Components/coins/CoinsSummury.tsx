"use client";
import { useCoinFilter } from "@/Hooks/UseCoinsFilter";
import { usePagination } from "@/Hooks/UsePagition";
import { UseMarket } from "@/react-query/UseMarket";
import Image from "next/image";
import React, { useState } from "react";
import CoinsSmmryCard from "../Cards/CoinsSmmryCard";

export default function CoinsSummury() {
  const [currency, setCurrency] = useState<string>("usd");
  const { data: Coins } = UseMarket(currency);
  const {filter,filteredCoins,setFilter} = useCoinFilter(Coins??[])
  const {currentItems:currentCoins,currentPage,totalPages,setCurrentPage} = usePagination(filteredCoins,10)
  const getCurrencySymbol = (cur: string) => {
    switch (cur) {
      case "usd":
        return "$";
      case "eur":
        return "€";
      case "gbp":
        return "£";
      case "jpy":
        return "¥";
      default:
        return "$";
    }
  };

  const symbol = getCurrencySymbol(currency);

  return (
    <div className="mt-14 flex flex-col items-center mr-auto ml-auto min-w-[648px] sm:w-[1450px] min-h-[800px] rounded-2xl shadow-2xl gap-8 p-6">
      <h3 className="text-6xl font-bold text-gray-700 text-shadow-md text-shadow-gray-800 mb-6 text-center">
        Summury Coins
      </h3>

      <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
        <input
          type="text"
          className="border border-gray-400 w-full sm:w-[300px] p-2 rounded-2xl bg-white text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search Coin..."
          value={filter.search}
          onChange={(e)=>{
            const value = e.target.value
            if (value === '') {
              setFilter({search:'',sortBy:'',sortType:''})
            }else{
              setFilter({...filter,search:value})
            }
          }}
        />
        <div className="flex flex-wrap justify-center sm:justify-end gap-8">
          <select
           className="p-2 border border-gray-800 rounded-xl focus:outline-none dark:bg-gray-900  dark:text-white dark:border-gray-700"
           value={filter.sortType}
           onChange={(e)=>{
            const value = e.target.value
            if (value === '') {
              setFilter({sortType:'',sortBy:'',search:''})
            }else{
              setFilter({...filter,sortType:value})
            }
           }}>
           <option value="">All Coins</option>
            <option value="top_gainers">Top Gainers</option>
            <option value="top_losers">Top Losers</option>
            <option value="high_volume">High Volume</option>
          </select>
          <select 
          className="p-2 border border-gray-800 rounded-xl focus:outline-none dark:bg-gray-900 dark:text-white dark:border-gray-700"
          value={filter.sortBy}
          onChange={(e)=>setFilter({...filter,sortBy:e.target.value})}>
            <option value="market_cap_asc">Market Cap ↑</option> 
            <option value="market_cap_desc">Market Cap ↓</option>
            <option value="price_asc">Price ↑</option>
            <option value="price_desc">Price ↓</option>
          </select>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="p-2 border border-gray-800 rounded-xl focus:outline-none dark:bg-gray-900 dark:text-white dark:border-gray-700"
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="gbp">GBP</option>
            <option value="jpy">JPY</option>
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
          {currentCoins?.map((coin, index) => (
           <CoinsSmmryCard key={coin.id} coin={coin} index={index} symbol={symbol} />
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
