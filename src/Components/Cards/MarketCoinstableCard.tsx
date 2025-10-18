import { CoinMarket } from "@/Interfaces/crypto/market";
import Image from "next/image";
import React from "react";

export default function MarketCoinstableCard({
  coin,
  index,
}: {
  coin: CoinMarket;
  index: number;
}) {
  return (
    <tr
      key={coin.id}
      className=" hover:bg-gray-50 transition text-xl font-normal"
    >
      <td className="px-4 py-3 text-center">{index + 1}</td>
      <td className="px-4 py-3 flex items-center gap-2">
        <Image
          src={coin.image}
          className="rounded-full"
          alt="coin_symbol"
          width={30}
          height={30}
        />
        <span className="font-semibold text-2xl">{coin.name} </span>
        <span className="uppercase text-gray-600 text-xs">{coin.symbol}</span>
      </td>
      <td className="px-4 py-3">${coin.current_price.toFixed(2)}</td>
      <td
        className={`px-4 py-3 ${
          coin.market_cap_change_percentage_24h < 0
            ? "text-red-600"
            : "text-green-400"
        }`}
      >
        %{coin.market_cap_change_percentage_24h?.toFixed(2) ?? "0.0"}
      </td>
      <td className="px-4 py-3">${coin.market_cap}</td>
      <td className="px-4 py-3">${coin.total_volume}</td>
    </tr>
  );
}
