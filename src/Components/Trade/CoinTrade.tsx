"use client";

import { useCoinTrade } from "@/Hooks/usecoinTrade";
import { useState } from "react";
import BuyModal from "./BuyModal";
import SellModal from "./SellModal";

import { IUser } from "@/Interfaces/users/users";
import { WalletCoin } from "@/Interfaces/crypto/wallet";

interface CoinTradeProps {
  coin: WalletCoin;
  coinPrice: number;
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  onLogin?: () => void;
}

export default function CoinTrade({
  coin,
  coinPrice,
  user,
  setUser,
  onLogin,
}: CoinTradeProps) {
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  const {
    buyAmount,
    setBuyAmount,
    amount,
    receivedCoin,
    isLoading,
    buyerror,
    sellError,
    handleBuy,
    handleSell,
    sellAmount,
    amountToSell,
    availableCoin,
    receivedUSD,
    setSellAmount,
    isSellLoading,
  } = useCoinTrade({
    coin,
    coinPrice,
    user,
    setUser,
  });

  async function confirmBuy() {
    const success = await handleBuy();

    if (success) {
      setIsBuyModalOpen(false);
    }
  }
  async function confirmSell() {
    const success = await handleSell();

    if (success) {
      setIsSellModalOpen(false);
    }
  }

  function openBuyModal() {
    if (!user) {
      onLogin?.();
      return;
    }

    setBuyAmount("");
    setIsBuyModalOpen(true);
  }

  function openSellModal() {
    if (!user) {
      onLogin?.();
      return;
    }

    setIsSellModalOpen(true);
  }

  return (
    <>
      {/* Trade Buttons */}
      <div className="w-full flex justify-end gap-4 mt-6">
        <button
          onClick={openBuyModal}
          className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors duration-200"
        >
          Buy
        </button>

        <button
          onClick={openSellModal}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors duration-200"
        >
          Sell
        </button>
      </div>

      {/* Buy Modal */}
      {isBuyModalOpen && (
        <BuyModal
          coin={coin}
          coinPrice={coinPrice}
          buyAmount={buyAmount}
          setBuyAmount={setBuyAmount}
          amount={amount}
          receivedCoin={receivedCoin}
          usdBalance={user?.usdBalance ?? 0}
          error={buyerror}
          isLoading={isLoading}
          onClose={() => setIsBuyModalOpen(false)}
          onConfirm={confirmBuy}
        />
      )}

      {/* Sell Modal */}
      {isSellModalOpen && (
        <SellModal
          coin={coin}
          coinPrice={coinPrice}
          sellAmount={sellAmount}
          setSellAmount={setSellAmount}
          amountToSell={amountToSell}
          availableCoin={availableCoin}
          receivedUSD={receivedUSD}
          sellError={sellError}
          isSellLoading={isSellLoading}
          onClose={() => setIsSellModalOpen(false)}
          onConfirm={confirmSell}
        />
      )}
    </>
  );
}
