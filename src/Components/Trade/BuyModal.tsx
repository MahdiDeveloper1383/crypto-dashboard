import { WalletCoin } from "@/Interfaces/crypto/wallet";
import Image from "next/image";

interface BuyModalProps {
  coin: WalletCoin;
  coinPrice: number;
  buyAmount: string;
  setBuyAmount: (value: string) => void;
  amount: number;
  receivedCoin: number;
  usdBalance: number;
  error: string;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function BuyModal({
  coin,
  coinPrice,
  buyAmount,
  setBuyAmount,
  amount,
  receivedCoin,
  usdBalance,
  error,
  isLoading,
  onClose,
  onConfirm,
}: BuyModalProps) {
  const coinImage =
    typeof coin.image === "string" ? coin.image : coin.image?.small;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="buy-modal-title"
        className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2
              id="buy-modal-title"
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              Buy {coin?.name}
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Purchase with your USD balance
            </p>
          </div>

          <button type="button" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Coin Information */}
        <div className="mb-6 flex items-center justify-between rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            {coinImage && (
              <Image src={coinImage} alt={coin.name} width={40} height={40} />
            )}

            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {coin?.name}
              </p>

              <p className="text-sm uppercase text-gray-500">{coin?.symbol}</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">Current price</p>

            <p className="font-semibold text-gray-900 dark:text-white">
              $
              {coinPrice.toLocaleString("en-US", {
                maximumFractionDigits: 8,
              })}
            </p>
          </div>
        </div>

        {/* Balance */}
        <div className="mb-4 flex justify-between text-sm">
          <span className="text-gray-500">Available balance</span>

          <span className="font-semibold text-gray-900 dark:text-white">
            $
            {usdBalance.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>

        {/* Input */}
        <label
          htmlFor="buy-amount"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Amount in USD
        </label>

        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            $
          </span>

          <input
            id="buy-amount"
            type="number"
            min="0.01"
            step="any"
            max={usdBalance}
            value={buyAmount}
            onChange={(e) => setBuyAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-9 pr-4 text-gray-900 outline-none focus:border-green-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Summary */}
        <div className="my-5 space-y-3 rounded-xl border border-gray-200 p-4 dark:border-gray-700">
          <div className="flex justify-between gap-3 text-sm">
            <span className="text-gray-500">You will receive</span>

            <span className="font-semibold text-gray-900 dark:text-white">
              {receivedCoin.toLocaleString("en-US", {
                maximumFractionDigits: 8,
              })}{" "}
              {coin?.symbol?.toUpperCase()}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Estimated fee</span>

            <span>$0.00</span>
          </div>
        </div>

        {/* Error */}
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

        {amount > usdBalance && amount > 0 && (
          <p className="mb-4 text-sm text-red-500">Insufficient USD balance.</p>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3 font-semibold dark:border-gray-700"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={
              !Number.isFinite(amount) ||
              amount <= 0 ||
              amount > usdBalance ||
              coinPrice <= 0 ||
              isLoading
            }
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Confirm Purchase"}
          </button>
        </div>
      </div>
    </div>
  );
}
