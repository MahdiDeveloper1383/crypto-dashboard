'use client'
import React from 'react'
import MarketstateCard from '../Cards/MarketstateCard'
import { UseGlobal } from '@/react-query/UseGlobal'


export default function MarketOverview() {
  const {data:globals} = UseGlobal()
  return (
    <div className='flex flex-col min-w-[648px]  min-h-[100px] shadow-2xl bg-amber-500 shadow-gray-600  rounded-2xl p-2 justify-center mt-10 items-center mr-auto ml-auto gap-5'>
      <h3 className='text-4xl text-blue-500 font-bold'>Market Overview</h3>
      <div className='w-full  grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 p-5 rounded-2xl'>
        <MarketstateCard title='total market' value={`$${globals?.data.total_market_cap.usd.toFixed(2)}`} change={globals?.data.market_cap_change_percentage_24h_usd.toLocaleString()}/>
        <MarketstateCard title='total volume' value={`$${globals?.data.total_volume.usd.toFixed(2)}`} />
        <MarketstateCard title='active coins' value={globals?.data.active_cryptocurrencies} />
        <MarketstateCard title='markets' value={globals?.data.markets} />
      </div>
    </div>
  )
}
