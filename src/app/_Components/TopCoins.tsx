import React from 'react'

export default function TopCoins() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 pl-52">
  <div className="bg-linear-to-r from-green-500 to-green-600 dark:bg-gray-800 rounded-2xl p-5 shadow-lg hover:shadow-xl transition">
    <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">Top Gainers (24h)</h3>
    <ul className="space-y-2">
      <li className="flex justify-between">
        <span className="text-gray-600 dark:text-gray-300">Solana (SOL)</span>
        <span className="text-green-500 font-bold">+12.5%</span>
      </li>
      <li className="flex justify-between">
        <span className="text-gray-600 dark:text-gray-300">Avalanche (AVAX)</span>
        <span className="text-green-500 font-bold">+9.8%</span>
      </li>
    </ul>
  </div>


  <div className="bg-linear-to-r from-red-600  to-red-700 dark:bg-gray-800 rounded-2xl p-5 shadow-lg hover:shadow-xl transition">
    <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">Top Losers (24h)</h3>
    <ul className="space-y-2">
      <li className="flex justify-between">
        <span className="text-gray-600 dark:text-gray-300">Doge (DOGE)</span>
        <span className="text-red-500 font-bold">-5.2%</span>
      </li>
    </ul>
  </div>


  <div className="bg-linear-to-r from-white to-gray-500 dark:bg-gray-800 rounded-2xl p-5 shadow-lg hover:shadow-xl transition flex flex-col">
    <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">Global Market Cap</h3>
    <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
      [Chart Placeholder]
    </div>
  </div>
</div>

  )
}
