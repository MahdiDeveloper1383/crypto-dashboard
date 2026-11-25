import { ICoin } from "@/Interfaces/crypto/coin";
import { IUser } from "@/Interfaces/users/users";
import { useState } from "react";

export function useCoinTrade({ coin, coinPrice, user, setUser }: any) {
  const [buyAmount, setBuyAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [buyerror, setBuyError] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const [sellError, setSellError] = useState("");
  const [isSellLoading, setIsSellLoading] = useState(false);
  const amount = Number(buyAmount);

  const receivedCoin = coinPrice > 0 && amount > 0 ? amount / coinPrice : 0;

  const amountToSell = Number(sellAmount);

  const userCoin = user?.balances?.find(
    (item: ICoin) => item.id === coin?.coinId,
  );

  const availableCoin = userCoin?.amount ?? 0;

  const receivedUSD =
    coinPrice > 0 && amountToSell > 0 ? amountToSell * coinPrice : 0;

  async function handleBuy() {
    setBuyError("");

    if (
      !user ||
      !coin?.id ||
      !Number.isFinite(amount) ||
      amount <= 0 ||
      amount > user.usdBalance ||
      coinPrice <= 0
    ) {
      setBuyError("Invalid purchase amount.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("/api/users/wallet/buy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coinId: coin.id,
          usdAmount: amount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Purchase failed");
      }

      setUser((prev: IUser) =>
        prev
          ? {
              ...prev,
              usdBalance: data.wallet.usdBalance ?? prev.usdBalance,
              balances: data.wallet.balances,
            }
          : prev,
      );

      setBuyAmount("");

      return true;
    } catch (error) {
      setBuyError(
        error instanceof Error ? error.message : "Something went wrong",
      );

      return false;
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSell() {
    setSellError("");

    if (!user || !coin?.id) {
      setSellError("Please login first.");
      return false;
    }

    if (!Number.isFinite(amountToSell) || amountToSell <= 0) {
      setSellError("Enter a valid amount.");
      return false;
    }

    if (amountToSell > availableCoin) {
      setSellError("Insufficient coin balance.");
      return false;
    }

    if (coinPrice <= 0) {
      setSellError("Invalid coin price.");
      return false;
    }

    try {
      setIsSellLoading(true);

      const response = await fetch("/api/users/wallet/sell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coinId: coin.id,
          amount: amountToSell,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Sale failed");
      }

      setUser((prev: IUser) =>
        prev
          ? {
              ...prev,
              usdBalance: data.wallet.usdBalance ?? prev.usdBalance,
              balances: data.wallet.balances,
            }
          : prev,
      );

      setSellAmount("");

      return true;
    } catch (error) {
      setSellError(
        error instanceof Error ? error.message : "Something went wrong",
      );

      return false;
    } finally {
      setIsSellLoading(false);
    }
  }

  return {
    // Buy
    buyAmount,
    setBuyAmount,
    amount,
    receivedCoin,
    isLoading,
    buyerror,
    handleBuy,

    // Sell
    sellAmount,
    setSellAmount,
    amountToSell,
    availableCoin,
    receivedUSD,
    isSellLoading,
    sellError,
    handleSell,
  };
}
