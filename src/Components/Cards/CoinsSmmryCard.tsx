import { CoinMarket } from '@/Interfaces/crypto/market'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function CoinsSmmryCard({coin,index,symbol}:{coin:CoinMarket,index:number,symbol:string}) {
  const router = useRouter()
  return (
     <tr  
     className="text-xl cursor-pointer hover:bg-gray-200"
     onClick={()=>router.push(`/coins/${coin.id}`)}
     >
              <td className="px-4 py-3 text-center">{index + 1}</td>
              <td className="px-4 py-3 flex gap-2 text-left">
                <Image
                  src={coin.image}
                  alt="coin"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <span className="font-semibold text-2xl">{coin.name} </span>
                <span className="uppercase text-gray-600 text-xs">
                  {coin.symbol}
                </span>
              </td>
              <td className="px-4 py-3 text-left">
                {symbol}
                {coin.current_price.toFixed(2)}
              </td>
              <td
                className={`px-4 py-3 ${
                  coin.market_cap_change_percentage_24h < 0
                    ? "text-red-600"
                    : "text-green-400"
                }`}
              >
                %{coin.market_cap_change_percentage_24h?.toFixed(2) ?? "0.0"}
              </td>
              <td className="px-4 py-3 text-left">
                {symbol}
                {coin.market_cap.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-left">{coin.market_cap_rank}</td>
              <td className="px-4 py-3 text-left">
                {symbol}
                {coin.total_volume.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-left">
                {coin.total_supply?.toFixed(2) ?? "—"}
              </td>
            </tr>
  )
}
