import { useUser } from "@/Hooks/UseUser";
import {
  ArrowDownLeft,
  ArrowDownRight,
  ArrowUp,
  ArrowUpRight,
} from "lucide-react";
import React from "react";

export default function Wallet() {
  const { user } = useUser();
  return (
    <div className="flex flex-col space-y-6">
      <div className="rounded-2xl border border-gray-300 p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            Wallet
          </h2>

          <span className="rounded-xl border border-gray-500 bg-gray-600 px-3 py-2 text-sm font-medium text-white">
            Demo Account
          </span>
        </div>

        {/* Balance */}
        <div className="mt-8">
          <p className="text-base text-gray-500">Total wallet balance</p>

          <h3 className="mt-2 text-3xl font-bold tracking-tight text-blue-600 sm:text-4xl">
            $
            {Number(user?.usdBalance ?? 0).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h3>

          <p className="mt-2 text-sm text-gray-500">Available balance in USD</p>
        </div>

        {/* Actions */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border bg-gray-800 text-white border-gray-300 px-4 py-3 font-medium transition hover:cursor-pointer hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <ArrowUpRight size={18} />
            Withdraw
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border bg-blue-800 text-white border-gray-300 px-4 py-3 font-medium transition hover:cursor-pointer hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <ArrowDownLeft size={18} />
            Deposit
          </button>
        </div>
      </div>
    </div>
  );
}
