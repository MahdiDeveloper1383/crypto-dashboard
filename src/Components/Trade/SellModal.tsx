import { WalletCoin } from "@/Interfaces/crypto/wallet";

interface SellModalProps {
  coin: WalletCoin;
  coinPrice: number;

  sellAmount: string;
  setSellAmount: (value: string) => void;

  amountToSell: number;
  availableCoin: number;
  receivedUSD: number;

  sellError: string;
  isSellLoading: boolean;

  onClose: () => void;
  onConfirm: () => void;
}

export default function SellModal({
  coin,
  coinPrice,
  sellAmount,
  setSellAmount,
  amountToSell,
  availableCoin,
  receivedUSD,
  sellError,
  isSellLoading,
  onClose,
  onConfirm,
}: SellModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sell-modal-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2
              id="sell-modal-title"
              className="text-2xl font-bold dark:text-white"
            >
              Sell {coin?.name}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Sell your coins for USD
            </p>
          </div>

          <button type="button" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Coin Information */}
        <div className="mb-6 rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
          <div className="flex justify-between">
            <span className="text-gray-500">Current price</span>

            <span className="font-semibold dark:text-white">
              $
              {coinPrice.toLocaleString("en-US", {
                maximumFractionDigits: 8,
              })}
            </span>
          </div>

          <div className="mt-3 flex justify-between">
            <span className="text-gray-500">Available balance</span>

            <span className="font-semibold dark:text-white">
              {availableCoin.toLocaleString("en-US", {
                maximumFractionDigits: 8,
              })}{" "}
              {coin?.symbol?.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Input */}
        <label
          htmlFor="sell-amount"
          className="mb-2 block text-sm font-medium dark:text-gray-300"
        >
          Amount to sell
        </label>

        <div className="relative">
          <input
            id="sell-amount"
            type="number"
            min="0"
            max={availableCoin}
            step="any"
            value={sellAmount}
            onChange={(e) => setSellAmount(e.target.value)}
            placeholder="Enter coin amount"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-red-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />

          <button
            type="button"
            onClick={() => setSellAmount(String(availableCoin))}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-red-500"
          >
            MAX
          </button>
        </div>

        {/* Summary */}
        <div className="my-5 space-y-3 rounded-xl border border-gray-200 p-4 dark:border-gray-700">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">You are selling</span>

            <span className="font-semibold dark:text-white">
              {amountToSell.toLocaleString("en-US", {
                maximumFractionDigits: 8,
              })}{" "}
              {coin?.symbol?.toUpperCase()}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">You will receive</span>

            <span className="font-semibold text-green-600">
              $
              {receivedUSD.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>

        {/* Error */}
        {sellError && <p className="mb-4 text-sm text-red-500">{sellError}</p>}

        {amountToSell > availableCoin && amountToSell > 0 && (
          <p className="mb-4 text-sm text-red-500">
            Insufficient coin balance.
          </p>
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
              !Number.isFinite(amountToSell) ||
              amountToSell <= 0 ||
              amountToSell > availableCoin ||
              coinPrice <= 0 ||
              isSellLoading
            }
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSellLoading ? "Processing..." : "Confirm Sale"}
          </button>
        </div>
      </div>
    </div>
  );
}
