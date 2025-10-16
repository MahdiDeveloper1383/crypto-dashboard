'use client'
import { UseMarket } from '@/Hooks/react-query/UseMarket'
import Image from 'next/image'
import React, { useState } from 'react'

export default function MarketCointable() {
  const {data:Coins} = UseMarket()
   const [CurrentPage, serCurrentPage] = useState(1);
  const ItemPerPage = 10;
  const indexofLastProduct = ItemPerPage * CurrentPage;
  const indexofFirstProduct = indexofLastProduct - ItemPerPage;
  const CurrentCoins = Coins?.slice(
    indexofFirstProduct,
    indexofLastProduct
  );
  return (
    <div className='mt-20 w-full h-screen max-w-[1450px] mx-auto shadow-2xl rounded-2xl overflow-x-auto  dark:bg-white'>
      <table className='min-w-full text-sm text-gray-700 '>
        <thead className=' bg-gradient-to-r from-indigo-400 to-blue-600 text-white'>
          <tr>   
          <th className='px-4 py-3 text-center'>#</th>
          <th className='px-4 py-3 text-left'>Coin</th>
          <th className='px-4 py-3 text-left'>Price</th>
          <th className='px-4 py-3 text-left'>%24h</th>
          <th className='px-4 py-3 text-left'>Market Cap</th>
          <th className='px-4 py-3 text-left'>Volume</th>
          </tr>
        </thead>
        <tbody>
          {
            CurrentCoins?.map((coin,index)=>(
              <tr key={coin.id} className=' hover:bg-gray-50 transition text-xl font-normal'>
                <td className='px-4 py-3 text-center'>{index+1}</td>
                <td className='px-4 py-3 flex items-center gap-2'>
                  <Image src={coin.image} className='rounded-full' alt='coin_symbol' width={30} height={30}/>
                  <span className='font-semibold text-2xl'>{coin.name} </span>
                  <span className='uppercase text-gray-600 text-xs'>
                  {coin.symbol}
                </span>
                </td>
                <td className='px-4 py-3'>${coin.current_price.toFixed(2)}</td>
                <td className={`px-4 py-3 ${coin.market_cap_change_percentage_24h < 0 ?'text-red-600' : 'text-green-400'}`}>%{coin.market_cap_change_percentage_24h?.toFixed(2) ?? '00'}</td>
                <td className='px-4 py-3'>${coin.market_cap}</td>
                <td className='px-4 py-3'>${coin.total_volume}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
        <div className="flex justify-center gap-2 mt-4">
            {Array.from(
              { length: Math.ceil((Coins?.length ?? 0) / ItemPerPage) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => serCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded cursor-pointer ${
                    CurrentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
    </div>
  )
}
