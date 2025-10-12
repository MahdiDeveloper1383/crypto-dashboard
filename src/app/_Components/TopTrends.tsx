'use client'
import React, { useState } from 'react'
import { UseTrend } from '../_Hooks/react-query/UseTrend'

export default function TopTrends() {
  const [activeTab, setActiveTab] = useState<'coins' | 'nfts'>('coins')
  const {data} = UseTrend()
  const list =
    activeTab === 'coins' ? data?.coins ?? [] :
    activeTab === 'nfts' ? data?.nfts ?? [] : []
    
  return (
   <section className="mt-14 w-full flex flex-col items-center justify-center text-center mb-10 gap-8">
      <h2 className="text-7xl font-bold dark:text-white drop-shadow-sm">
        Top Trends
      </h2>

      <div className="flex gap-4 bg-gray-100 dark:bg-gray-800 p-2 rounded-full shadow-inner">
        <button
          onClick={() => setActiveTab('coins')}
          className={`px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300 ${
            activeTab === 'coins'
              ? 'bg-green-500 text-white shadow-md'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Coins
        </button>
        <button
          onClick={() => setActiveTab('nfts')}
          className={`px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300 ${
            activeTab === 'nfts'
              ? 'bg-green-500 text-white shadow-md'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          NFTs
        </button>
      </div>


      <div className="min-w-[1400px] min-h-[700px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl shadow-gray-500 p-6">
  
           <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((item: any) => (
            <li
              key={activeTab === 'coins' ? item.item.id : item.id}
              className="bg-gray-100 dark:bg-gray-800 hover:scale-105 transition-transform duration-300 rounded-2xl shadow-lg p-6 flex flex-col justify-center items-center text-gray-800 dark:text-white"
            >
              {activeTab === 'coins' ? (
                <>
          
                  <h3 className="text-2xl font-bold mb-1">{item.item.name}</h3>
                  <p className="text-green-500 font-semibold text-xl mb-1">
                    ${item.item.data?.price.toFixed(4)}
                  </p>
                  <p className="text-sm opacity-80">
                    Rank #{item.item.market_cap_rank}
                  </p>
                </>
              ) : (
                <>
      
                  <h3 className="text-2xl font-bold mb-1">{item.name}</h3>
                  <p className="text-green-500 font-semibold text-xl mb-1">
                    {item.data?.floor_price}
                  </p>
                  <p className="text-sm opacity-80">
                    Symbol: {item.symbol.toUpperCase()}
                  </p>
                </>
              )}
            </li>
            ))}
            
          
        
        </ul>
      </div>
    </section>
  )
}
