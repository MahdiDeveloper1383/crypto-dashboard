"use client";
import React from "react";
import { UseCoin } from "@/react-query/UseCoin";
import Header from "@/Components/layout/Header";
import Footer from "@/Components/layout/Footer";
import Image from "next/image";
import Link from "next/link";

export default function Coin({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  const { data: coin, isLoading, error } = UseCoin({ coin: id });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

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
              <button className="w-10 h-10">
                <svg
                  width={30}
                  height={30}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                >
                  <path
                    fill="#f20707"
                    d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z"
                  />
                </svg>
                <svg
                  width={30}
                  height={30}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                >
                  <path
                    fill="#ededed"
                    d="M442.9 144C415.6 144 389.9 157.1 373.9 179.2L339.5 226.8C335 233 327.8 236.7 320.1 236.7C312.4 236.7 305.2 233 300.7 226.8L266.3 179.2C250.3 157.1 224.6 144 197.3 144C150.3 144 112.2 182.1 112.2 229.1C112.2 279 144.2 327.5 180.3 371.4C221.4 421.4 271.7 465.4 306.2 491.7C309.4 494.1 314.1 495.9 320.2 495.9C326.3 495.9 331 494.1 334.2 491.7C368.7 465.4 419 421.3 460.1 371.4C496.3 327.5 528.2 279 528.2 229.1C528.2 182.1 490.1 144 443.1 144zM335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1C576 297.7 533.1 358 496.9 401.9C452.8 455.5 399.6 502 363.1 529.8C350.8 539.2 335.6 543.9 320 543.9C304.4 543.9 289.2 539.2 276.9 529.8C240.4 502 187.2 455.5 143.1 402C106.9 358.1 64 297.7 64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1L320 171.8L335 151.1z"
                  />
                </svg>
              </button>
            </div>
            <div className="flex justify-end mb-4">
              <select className="p-2 px-4 border rounded-full">
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
                      ${coin?.market_data.current_price.usd?.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-900 dark:text-gray-100">
                      ${coin?.market_data.market_cap.usd?.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-900 dark:text-gray-100">
                      ${coin?.market_data.total_volume.usd?.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-900 dark:text-gray-100">
                      %
                      {coin?.market_data.price_change_percentage_24h.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-900 dark:text-gray-100">
                      $
                      {coin?.market_data.fully_diluted_valuation.usd.toLocaleString()}
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
                    ${coin?.market_data.high_24h.usd?.toLocaleString()}
                  </span>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-xl flex flex-col items-center justify-center">
                  <span className="font-semibold text-gray-800 dark:text-gray-100">
                    24h Low
                  </span>
                  <span className="text-red-500 font-medium">
                    ${coin?.market_data.low_24h.usd?.toLocaleString()}
                  </span>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-xl flex flex-col items-center justify-center">
                  <span className="font-semibold text-gray-800 dark:text-gray-100">
                    All Time High
                  </span>
                  <span className="text-gray-400 font-medium">
                    ${coin?.market_data.ath.usd?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
