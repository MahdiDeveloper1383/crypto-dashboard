"use client";
import React, { useState } from "react";
import { UseCoin } from "@/react-query/UseCoin";
import Header from "@/Components/layout/Header";
import Footer from "@/Components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { UseChart } from "@/react-query/UseCharts";
import Chart from "@/Components/Chart/Chart";
import { convertToMarketPoint } from "@/utils/CovertChart";
import { useSearchChartStore } from "@/zustand/UseSearchChart";
import { getCurrencySymbol } from "@/utils/CurrenySymbol";
import { ICoin } from "@/Interfaces/crypto/coin";
import { useUser } from "@/Hooks/UseUser";
import { useRouter } from "next/navigation";

export default function Coin({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter()
  const { data: coin, isLoading, error } = UseCoin({ coin: id });
  const {user} = useUser()
const [isWatchlisted, setIsWatchlisted] = useState(false);

React.useEffect(() => {
  if (user && coin) {
    setIsWatchlisted(
      user.watchlist?.includes(coin.id) ?? false
    );
  }
}, [user, coin]);  const chart_coin = coin?.id ? [coin.id] : [];
  const { data: chart } = UseChart(chart_coin, { enabled: !!coin?.id });
  const { setShowMarketCap, showMarketCap, setShowVolume, showVolume } = useSearchChartStore();
  const [currency,setCurrency] = useState<string>('usd')
  const symbol = getCurrencySymbol(currency)
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
 async function Addcoinwatchlist(coin:ICoin | undefined){
   if (!coin) return;
   if (!user) {
    router.push('/login')
    return
   }
   const response = await fetch('/api/users/watchlist',{
    method:'POST',
    headers:{"Content-Type": "application/json"},
    body:JSON.stringify({coinId:coin.id})
   })
    if (!response.ok) {
    console.error("Failed to add coin to watchlist");
    return;
  }
setIsWatchlisted((prev) => !prev);
  }
  return (
    <React.Fragment>
      <Header />
      <div className="flex flex-col gap-6 max-w-[1300px] w-full  mx-auto bg-gray-200 rounded-2xl shadow-2xl items-center mt-12 mb-9 overflow-y-auto">
        <div className="w-full flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-gray-600 to-gray-500 rounded-2xl p-6 gap-6 shadow-lg">
          <div className="flex flex-row items-center gap-4">
            <Image
              src={coin?.image.large || "/placeholder.png"}
              alt={coin?.name || "coin"}
              width={70}
              height={70}
              className="rounded-full object-contain border-2 shadow-md"
            />
            <div className="flex flex-col">
              <h3 className="text-white text-4xl font-bold tracking-wide">
                {coin?.name}{" "}
                <span className="uppercase text-gray-300">
                  ({coin?.symbol})
                </span>
              </h3>
              <h5 className="text-lg text-gray-200 font-medium mt-1">
                Rank #{coin?.market_data.market_cap_rank}
              </h5>
            </div>
          </div>
          <div className="text-gray-100 text-lg sm:text-xl font-medium">
            <p>
              Activity start date:{" "}
              <span className="font-semibold text-white">
                {coin?.genesis_date || "—"}
              </span>
            </p>
            <Link
              href={
                (Array.isArray(coin?.links.homepage)
                  ? coin?.links.homepage[0]
                  : coin?.links.homepage) || "undefind"
              }
              target="_blank"
            >
              {coin?.links.homepage}
            </Link>
          </div>
        </div>
        <div className="w-full p-5 bg-gradient-to-r from-gray-500 to-gray-600 rounded-2xl">
          <div className="flex justify-between items-center">
            <div className="flex justify-start mb-4">
     <button
  type="button"
  onClick={() => Addcoinwatchlist(coin)}
  disabled={!user}
  aria-label={
    isWatchlisted
      ? "Remove from watchlist"
      : "Add to watchlist"
  }
  className="
    group
    relative
    flex
    h-12
    w-12
    items-center
    justify-center
    rounded-full
    cursor-pointer
    transition-all
    duration-300
    hover:bg-red-100
    active:scale-90
    disabled:cursor-not-allowed
  "
>
  <svg
    width="30"
    height="30"
    viewBox="0 0 640 640"
    className={`
      transition-all
      duration-300
      ease-out
      ${
        isWatchlisted
          ? "scale-125 fill-red-500 stroke-red-500"
          : "scale-100 fill-none stroke-gray-200"
      }
      ${user ? "group-hover:scale-110" : ""}
    `}
  >
    <path
      stroke="currentColor"
      strokeWidth="45"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M442.9 144C415.6 144 389.9 157.1 373.9 179.2L339.5 226.8C335 233 327.8 236.7 320.1 236.7C312.4 236.7 305.2 233 300.7 226.8L266.3 179.2C250.3 157.1 224.6 144 197.3 144C150.3 144 112.2 182.1 112.2 229.1C112.2 279 144.2 327.5 180.3 371.4C221.4 421.4 271.7 465.4 306.2 491.7C309.4 494.1 314.1 495.9 320.2 495.9C326.3 495.9 331 494.1 334.2 491.7C368.7 465.4 419 421.3 460.1 371.4C496.3 327.5 528.2 279 528.2 229.1C528.2 182.1 490.1 144 443.1 144z"
    />
  </svg>
</button>
            </div>
            <div className="flex justify-end mb-4">
              <select className="p-2 px-4 border rounded-full" value={currency} onChange={(e)=>setCurrency(e.target.value)}>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="gbp">GBP</option>
                <option value="jpy">JPY</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col w-full gap-5">
            <div className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col gap-6 transition-all hover:shadow-xl hover:scale-[1.02] duration-300">
              <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center border-b border-gray-300 dark:border-gray-700 pb-3">
                Coin Info
              </h4>

              <ul className="space-y-2 text-gray-800 dark:text-gray-300 text-lg">
                <li>
                  <strong>Country:</strong> {coin?.country_origin || "—"}
                </li>

                <li>
                  <strong>Categories:</strong>{" "}
                  {coin?.categories?.length
                    ? coin.categories.slice(0, 5).join(", ")
                    : "—"}
                </li>

                <li>
                  <strong>Platform:</strong> {coin?.asset_platform_id || "—"}
                </li>

                <li>
                  <strong>Links:</strong>
                  <ul className="list-disc ml-6 mt-2 space-y-1 text-blue-500 dark:text-blue-400">
                    <li>
                      <Link
                        href={coin?.links?.homepage?.[0] || "#"}
                        target="_blank"
                        className="hover:underline"
                      >
                        Homepage
                      </Link>
                    </li>
                    {coin?.links?.telegram_channel_identifier && (
                      <li>
                        <Link
                          href={`https://t.me/${coin.links.telegram_channel_identifier}`}
                          target="_blank"
                          className="hover:underline"
                        >
                          Telegram
                        </Link>
                      </li>
                    )}
                    {coin?.links?.twitter_screen_name && (
                      <li>
                        <Link
                          href={`https://twitter.com/${coin.links.twitter_screen_name}`}
                          target="_blank"
                          className="hover:underline"
                        >
                          Twitter
                        </Link>
                      </li>
                    )}
                    {coin?.links?.blockchain_site?.[0] && (
                      <li>
                        <Link
                          href={coin.links.blockchain_site[0]}
                          target="_blank"
                          className="hover:underline"
                        >
                          Blockchain
                        </Link>
                      </li>
                    )}
                  </ul>
                </li>
              </ul>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 text-sm">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl flex flex-col items-center">
                  <span className="font-semibold text-gray-800 dark:text-gray-100">
                    👍 Positive Votes
                  </span>
                  <span className="text-green-500 font-bold text-lg">
                    %{coin?.sentiment_votes_up_percentage?.toFixed(1) || "0"}
                  </span>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl flex flex-col items-center">
                  <span className="font-semibold text-gray-800 dark:text-gray-100">
                    👎 Negative Votes
                  </span>
                  <span className="text-red-500 font-bold text-lg">
                    %{coin?.sentiment_votes_down_percentage?.toFixed(1) || "0"}
                  </span>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl flex flex-col items-center">
                  <span className="font-semibold text-gray-800 dark:text-gray-100">
                    👀 Watchlist Users
                  </span>
                  <span className="text-gray-500 font-bold text-lg">
                    {coin?.watchlist_portfolio_users?.toLocaleString() || "0"}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col gap-5 transition-transform hover:scale-[1.02] duration-300">
              <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center pb-2">
                Market Overview
              </h4>

              <table className="w-full border-separate border-spacing-y-2">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-400 to-blue-500 text-white">
                    <th className="px-4 py-2 rounded-l-lg text-center font-medium">
                      Market Rank
                    </th>
                    <th className="px-4 py-2  text-center font-medium">
                      Price
                    </th>
                    <th className="px-4 py-2 text-center font-medium">
                      Market Cap
                    </th>
                    <th className="px-4 py-2  text-center font-medium">
                      24h Volume
                    </th>
                    <th className="px-4 py-2 text-center font-medium">
                      24h Price Change
                    </th>
                    <th className="px-4 py-2 rounded-r-lg text-center font-medium">
                      FDV
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <td className="px-4 py-3 text-center text-gray-900 dark:text-gray-100">
                      #{coin?.market_data.market_cap_rank.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-900 dark:text-gray-100">
                      {symbol}{coin?.market_data.current_price[currency]?.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-900 dark:text-gray-100">
                      {symbol}{coin?.market_data.market_cap[currency]?.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-900 dark:text-gray-100">
                      {symbol}{coin?.market_data.total_volume[currency]?.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-900 dark:text-gray-100">
                      %{coin?.market_data.price_change_percentage_24h.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-900 dark:text-gray-100">
                      {symbol}{coin?.market_data.fully_diluted_valuation[currency].toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="grid grid-cols-3 gap-3 text-sm text-gray-700 dark:text-gray-300 mt-3">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-xl flex flex-col items-center justify-center">
                  <span className="font-semibold text-gray-800 dark:text-gray-100">
                    24h High
                  </span>
                  <span className="text-green-500 font-medium">
                    {symbol}{coin?.market_data.high_24h[currency]?.toLocaleString()}
                  </span>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-xl flex flex-col items-center justify-center">
                  <span className="font-semibold text-gray-800 dark:text-gray-100">
                    24h Low
                  </span>
                  <span className="text-red-500 font-medium">
                    {symbol}{coin?.market_data.low_24h[currency]?.toLocaleString()}
                  </span>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-xl flex flex-col items-center justify-center">
                  <span className="font-semibold text-gray-800 dark:text-gray-100">
                    All Time High
                  </span>
                  <span className="text-gray-400 font-medium">
                    {symbol}{coin?.market_data.ath[currency]?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col gap-6 transition-transform hover:scale-[1.02] duration-300">
              <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center border-b border-gray-200 dark:border-gray-700 pb-3">
                Coin Chart
              </h4>

              <div className="flex flex-col gap-4 mt-4">
                <div className="flex flex-wrap items-center gap-6 text-gray-700 dark:text-gray-300">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-blue-500"
                      checked={showMarketCap}
                      onChange={() => setShowMarketCap(!showMarketCap)}
                    />
                    <span className="text-blue-800 dark:text-blue-400 font-medium">
                      Market Cap
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      checked={showVolume}
                      onChange={() => setShowVolume(!showVolume)}
                      type="checkbox"
                      className="w-4 h-4 accent-red-500"
                    />
                    <span className="text-red-500 dark:text-red-400 font-medium">
                      Volume
                    </span>
                  </label>
                </div>

                <div className="w-full mt-4">
                  <Chart
                    data={convertToMarketPoint(chart?.coins[0])}
                    showMarketCap={showMarketCap}
                    showVolume={showVolume}
                  />
                </div>
              </div>
            </div>
            <div className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col gap-6 transition-transform hover:scale-[1.02] duration-300">
              <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center border-b border-gray-200 dark:border-gray-700 pb-3">
                Coin Description
              </h4>
              <p className="text-xl">{coin?.description.en || ""}</p>
            </div>
            <div className="w-full flex justify-end gap-4 mt-6">
              <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors duration-200">
                Buy
              </button>
              <button className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors duration-200">
                Sell
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
