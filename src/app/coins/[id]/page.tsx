'use client'
import React from 'react'
import { UseCoin } from '@/react-query/UseCoin'
import Header from '@/Components/layout/Header'
import Footer from '@/Components/layout/Footer'

export default function Coin({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)

  const { data:coin, isLoading, error } = UseCoin({ coin: id, currency: 'usd' })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading data</div>

  return (
    <React.Fragment>
    <Header/>
    <div>
      <h2>{coin.id}</h2>
      <p>{coin.name}</p>
      <p>{coin.symbol}</p>
    </div>
    <Footer/>
    </React.Fragment>
  )
}
