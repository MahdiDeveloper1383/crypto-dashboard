
import CoinsSmmryCard from "@/Components/Cards/CoinsSmmryCard";
import { useUser } from "@/Hooks/UseUser";
import { UseMarket } from "@/react-query/UseMarket";
import {
  ArrowDownLeft,
  ArrowUpRight
} from "lucide-react";
import React, { useState } from "react";

export default function Wallet() {
  const { user,setUser } = useUser();
  const { data: markets, isLoading } = UseMarket('usd');
  const [WithdrawOpenModal,setWithdrawOpenModal] = useState(false)
  const [withdraw,setwithdraw] = useState(0)
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
   async function handleWithdraw() {
  if (!withdraw || withdraw <= 0) {
    console.error("Invalid withdraw amount");
    return;
  }

  try {
    const response = await fetch("/api/users/wallet/withdraw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: withdraw,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Withdraw failed");
    }
    setUser((prev) =>
  prev
    ? {
        ...prev,
        usdBalance: data.wallet.usdBalance,
      }
    : prev
);

    setWithdrawOpenModal(false);
    setwithdraw(0);

    console.log("Withdraw successful:", data);
  } catch (error) {
    console.error("Withdraw error:", error);
  }
}
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
            onClick={()=>setWithdrawOpenModal(true)}
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
      {WithdrawOpenModal && (
        <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
            <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="buy-modal-title"
            className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2
                  id="buy-modal-title"
                  className="text-2xl font-bold text-gray-900 dark:text-white"
                >
                  Withdraw
                </h2>
               
              </div>

              <button
                type="button"
                onClick={() => setWithdrawOpenModal(false)}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-4">
             <div className="flex flex-col gap-4">
  <div className="flex items-center justify-between rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
    <span className="text-gray-500">Available Balance</span>
    <span className="font-bold text-green-600">
      ${Number(user?.usdBalance ?? 0).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </span>
  </div>

  <input
    type="number"
    min="0"
    max={user?.usdBalance ?? 0}
    step="any"
    value={withdraw || ""}
    placeholder="Enter withdraw amount"
    onChange={(e) => {
      const value = Number(e.target.value);

      if (value >= 0 && value <= (user?.usdBalance ?? 0)) {
        setwithdraw(value);
      }
    }}
    onKeyDown={(e)=>{
      if (e.key === "Enter") {
        handleWithdraw()
      }
    }}
    className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-9 pr-4 text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
  />

  <p className="text-sm text-gray-500">
    Maximum withdrawal: ${user?.usdBalance ?? 0}
  </p>
</div>
               <button
                type="button"
                className="flex-1 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={handleWithdraw}
              >
                Confirm Withdrawal
              </button>
            </div>
            </div>
        </div>
      )}
    </div>
  );
}
