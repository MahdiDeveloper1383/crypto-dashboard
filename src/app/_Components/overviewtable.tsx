export default function GlobalMarketTable() {
  return (
    <div className="flex justify-center mt-12">
      <div className="overflow-x-auto shadow-lg rounded-2xl border border-gray-200 bg-white w-full max-w-6xl">
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
              <td className="border-t px-4 py-3 font-medium text-gray-800">13,690</td>
              <td className="border-t px-4 py-3">1,046</td>
              <td className="border-t px-4 py-3 text-green-600 font-semibold">$2.72 Trillion</td>
              <td className="border-t px-4 py-3 text-blue-600 font-semibold">$69.3 Billion</td>
              <td className="border-t px-4 py-3 text-emerald-600 font-semibold">+1.72%</td>
              <td className="border-t px-4 py-3 text-yellow-600">50.4%</td>
              <td className="border-t px-4 py-3 text-indigo-600">14.9%</td>
              <td className="border-t px-4 py-3 text-gray-500">2025-10-08</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
