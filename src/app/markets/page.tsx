
import Footer from '@/Components/layout/Footer'
import Header from '@/Components/layout/Header'
import MarketOverview from '@/Components/markets/MarketOverview'
import React from 'react'

export default function Markets() {
  return (
    <React.Fragment>
    <Header/>
    <MarketOverview/>
    <Footer/>
    </React.Fragment>
  )
}
