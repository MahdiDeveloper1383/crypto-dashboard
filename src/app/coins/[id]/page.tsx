'use client'
import { CoinMarket } from '@/Interfaces/crypto/market'
import { UseMarket } from '@/react-query/UseMarket'
import React, { useEffect, useState } from 'react'

export default function Coin({ params }: { params: { id: string } }) {
    const {id} = params
    const [coin,setCoin] = useState<CoinMarket>()
    const {data:market} = UseMarket('usd')
    useEffect(()=>{
      if (market) {
        const u = market?.find(u => u.id === id)
        setCoin(u)
      }
      },[market,id])
  return (
    <div>

    </div>
  )
}
