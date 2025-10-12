'use client'
import React, { useState } from 'react'
import { UseChart } from '../_Hooks/react-query/UseCharts'
import Chart from './Chart/Chart'
import { convertToMarketPoint } from '../_Hooks/utils/CovertChart'

export default function Chart_section() {
  const [chartcoin, setChartcoin] = useState<string[]>(['bitcoin'])
  const [coin, setCoin] = useState<string[]>(chartcoin)
  const { data: chart, isLoading, error } = UseChart(coin)
  const [showMarketCap,setshowMarketCap] = useState<boolean>(false)
  const [showVolume,setshowVolume] = useState<boolean>(false)

  return (
    <div className="mt-12 px-6 text-center">
      <h2 className="text-5xl md:text-6xl font-bold text-green-600 drop-shadow-md mb-10">
        Market Chart
      </h2>

      {isLoading && (
        <h4 className="text-3xl text-yellow-400 animate-pulse">Loading...</h4>
      )}
      {error && (
        <h4 className="text-3xl text-red-500 font-semibold">
          Fetching data failed
        </h4>
      )}

      {!error && !isLoading && (
        <div className="flex flex-col mt-8 gap-10">
          {chart?.coins.map((coinchart, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={chartcoin[0]}
                    onChange={(e) => setChartcoin([e.target.value.toLowerCase()])}
                    placeholder="Enter coin name"
                    className="border border-gray-300 bg-white rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <button
                    onClick={() => setCoin(chartcoin)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition-colors duration-300"
                  >
                    Save
                  </button>
                </div>

                <div className="flex items-center gap-6 text-gray-700">
                  <label className="flex items-center gap-2">
                    <input type="checkbox"  checked={showMarketCap} onChange={()=>setshowMarketCap(!showMarketCap)} />
                    <span className='text-blue-800'>Market Cap</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={showVolume} onChange={()=>setshowVolume(!showVolume)} />
                    <span className='text-red-500 '>Volume</span>
                  </label>
                </div>
              </div> 

              <div className="max-w-[1200px] w-full mx-auto  dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-700 dark:text-gray-200 mb-5">
                  {coin[index].toUpperCase()}
                </h3>
                <Chart
                  data={convertToMarketPoint(coinchart)}
                  showMarketCap = {showMarketCap}
                  showVolume={showVolume}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  )
}
