'use client'
import React from 'react'
import { UseCoin } from '@/react-query/UseCoin'

export default function Coin({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)

  const { data, isLoading, error } = UseCoin({ coin: id, currency: 'usd' })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading data</div>

  return (
    <div>
      <h2>{data?.id}</h2>
      <p>{data?.name}</p>
      <p>{data?.symbol}</p>
    </div>
  )
}
