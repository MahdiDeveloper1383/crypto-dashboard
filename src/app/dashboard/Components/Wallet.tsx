
import CoinsSmmryCard from "@/Components/Cards/CoinsSmmryCard";
import { useUser } from "@/Hooks/UseUser";
import { UseMarket } from "@/react-query/UseMarket";
import {
  ArrowDownLeft,
  ArrowUpRight
} from "lucide-react";
import React from "react";

export default function Wallet() {
  const { user } = useUser();
  const { data: markets, isLoading } = UseMarket('usd');

  const userAssets = user?.balances
    .map((balance) => {
      const marketCoin = markets?.find(
        (coin) => coin.id === balance.coinId
      );

      return marketCoin
        ? { ...marketCoin, amount: balance.amount }
        : null;
    })
    .filter((coin) => coin !== null);

  return (
    <div className="flex flex-col space-y-6">
      <div className="rounded-2xl border border-gray-300 p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            Wallet
          </h2>

          <span className="rounded-xl border border-gray-500 bg-gray-600 px-3 py-2 text-sm font-medium text-white">
            Demo Account
          </span>
        </div>

        <div className="mt-8">
          <p className="text-base text-gray-500">Total wallet balance</p>

          <h3 className="mt-2 text-3xl font-bold tracking-tight text-blue-600 sm:text-4xl">
            $
            {Number(user?.usdBalance ?? 0).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Available balance in USD
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border bg-gray-800 text-white border-gray-300 px-4 py-3 font-medium transition hover:cursor-pointer hover:opacity-80"
          >
            <ArrowUpRight size={18} />
            Withdraw
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border bg-blue-800 text-white border-gray-300 px-4 py-3 font-medium transition hover:cursor-pointer hover:opacity-80"
          >
            <ArrowDownLeft size={18} />
            Deposit
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-300 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">
          My Assets
        </h2>

        {isLoading ? (
          <p className="mt-4">Loading assets...</p>
        ) : userAssets?.length ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full">
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
                {userAssets.map((coin, index) => (
                  <CoinsSmmryCard
                    key={coin.id}
                    coin={coin}
                    index={index}
                    symbol="$"
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-4 text-gray-500">
            You don't have any crypto assets yet.
          </p>
        )}
      </div>
    </div>
  );
}
