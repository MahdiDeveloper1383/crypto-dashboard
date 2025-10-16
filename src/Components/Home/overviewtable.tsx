'use client'
import { UseGlobal } from "../../react-query/UseGlobal";

export default function GlobalMarketTable() {
    const {data,error,isLoading} = UseGlobal()
  return (
    <div className="w-[648px] sm:w-full flex justify-center mt-12">
      <div className="overflow-x-auto shadow-lg rounded-2xl border border-gray-200 bg-white w-full max-w-6xl">
        {error && <p className="text-3xl text-red-600 text-center">fetching data faild</p>}
        {isLoading && <p className="text-3xl text-yellow-300 text-center">Is Loading...</p>}
        {!error && !isLoading &&
        <table className="min-w-full border-collapse text-sm text-gray-700">
          <thead className="bg-gradient-to-r from-indigo-500 to-blue-800 text-white text-center">
            <tr>
              <th className="px-4 py-3 font-semibold">Active Cryptocurrencies</th>
              <th className="px-4 py-3 font-semibold">Markets</th>
              <th className="px-4 py-3 font-semibold">Total Market Cap (USD)</th>
              <th className="px-4 py-3 font-semibold">24h Volume (USD)</th>
              <th className="px-4 py-3 font-semibold">Market Cap Change (24h)</th>
              <th className="px-4 py-3 font-semibold">BTC Dominance</th>
              <th className="px-4 py-3 font-semibold">ETH Dominance</th>
              <th className="px-4 py-3 font-semibold">Last Updated</th>
            </tr>
          </thead>

          <tbody>
            <tr className="bg-gray-50 hover:bg-gray-100 transition-colors text-center">
              <td className="border-t px-4 py-3 font-medium text-gray-800">{data?.data.active_cryptocurrencies}</td>
              <td className="border-t px-4 py-3">{data?.data.markets}</td>
              <td className="border-t px-4 py-3 text-green-600 font-semibold">${data?.data.total_market_cap.usd.toFixed(2)}</td>
              <td className="border-t px-4 py-3 text-blue-600 font-semibold">${data?.data.total_volume.usd.toLocaleString()} </td>
              <td className="border-t px-4 py-3 text-emerald-600 font-semibold">%{data?.data.market_cap_change_percentage_24h_usd.toFixed(2)}</td>
              <td className="border-t px-4 py-3 text-yellow-600">%{data?.data.market_cap_percentage.btc.toFixed(2)}</td>
              <td className="border-t px-4 py-3 text-indigo-600">%{data?.data.market_cap_percentage.eth.toFixed(2)}</td>
              <td className="border-t px-4 py-3 text-gray-500">2025-06-28</td>
            </tr>
          </tbody>
        </table>
        }
      </div>
    </div>
  );
}
