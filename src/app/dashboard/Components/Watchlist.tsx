"use client";

import { useUser } from "@/Hooks/UseUser";
import { useCoinFilterStore } from "@/zustand/UseCoinFilterStore";
import { Search, Heart, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

const ITEMS_PER_PAGE = 5;

export default function Watchlist() {
  const { user } = useUser();
  const { setSearch, search } = useCoinFilterStore();

  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingCoin, setDeletingCoin] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Sync local UI state with the user's watchlist
  useEffect(() => {
    setWatchlist(user?.watchlist ?? []);
  }, [user?.watchlist]);

  // Filter the watchlist by coin ID
  const filteredWatchlist = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return watchlist;

    return watchlist.filter((coin) => coin.toLowerCase().includes(query));
  }, [watchlist, search]);

  const totalPages = Math.ceil(filteredWatchlist.length / ITEMS_PER_PAGE);

  const safePage = Math.min(currentPage, Math.max(totalPages, 1));

  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;

  const currentCoins = filteredWatchlist.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // Reset to page 1 when the search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Delete a coin from the user's watchlist

  async function handleRemoveCoin(coinId: string) {
    setError("");
    setDeletingCoin(coinId);

    try {
      const response = await fetch("/api/users/watchlist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coinId }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ?? "Failed to remove coin from watchlist.",
        );
      }

      // Update the UI only after the API confirms success
      setWatchlist(result.watchlist);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setDeletingCoin(null);
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Watchlist
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Your favorite cryptocurrencies
        </p>
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-800 dark:bg-gray-900">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="search"
            placeholder="Search coins, e.g. bitcoin..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      {/* Watchlist table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-gray-800">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              My Coins
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {filteredWatchlist.length} of {watchlist.length} coins
            </p>
          </div>

          <Heart size={24} className="fill-red-500 text-red-500" />
        </div>

        {error && (
          <p role="alert" className="px-6 pt-4 text-sm text-red-500">
            {error}
          </p>
        )}

        {currentCoins.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/70">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                      Coin
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600 dark:text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {currentCoins.map((coin, index) => (
                    <tr
                      key={coin}
                      className="border-t border-gray-100 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                            {startIndex + index + 1}
                          </div>

                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {coin}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Cryptocurrency
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/coins/${coin}`}
                            title="View coin"
                            aria-label={`View ${coin}`}
                            className="rounded-lg bg-blue-50 p-2.5 text-blue-600 transition hover:bg-blue-100 active:scale-90 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                          >
                            <Eye size={18} />
                          </Link>

                          <button
                            type="button"
                            title="Remove from watchlist"
                            aria-label={`Remove ${coin} from watchlist`}
                            disabled={deletingCoin === coin}
                            onClick={() => handleRemoveCoin(coin)}
                            className="rounded-lg bg-red-50 p-2.5 text-red-500 transition hover:bg-red-100 active:scale-90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-red-900/30 dark:hover:bg-red-900/50"
                          >
                            <Heart size={18} className="fill-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col gap-3 border-t border-gray-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing {startIndex + 1}–{startIndex + currentCoins.length} of{" "}
                {filteredWatchlist.length}
              </p>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  disabled={safePage <= 1}
                  onClick={() => setCurrentPage((page) => page - 1)}
                  className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                <span className="px-2 text-sm text-gray-600 dark:text-gray-300">
                  {safePage} / {Math.max(totalPages, 1)}
                </span>

                <button
                  type="button"
                  disabled={safePage >= totalPages}
                  onClick={() => setCurrentPage((page) => page + 1)}
                  className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-20">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20">
              <Heart size={30} className="text-red-500" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {watchlist.length === 0
                ? "Your Watchlist is Empty"
                : "No Coins Found"}
            </h3>

            <p className="mt-2 max-w-md text-center text-gray-500 dark:text-gray-400">
              {watchlist.length === 0
                ? "Add cryptocurrencies to your watchlist to keep track of them."
                : "Try searching with a different coin ID."}
            </p>

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
