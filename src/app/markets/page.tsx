
import Chart_section from '@/Components/Chart/Chart_section'
import Footer from '@/Components/layout/Footer'
import Header from '@/Components/layout/Header'
import MarketCointable from '@/Components/markets/MarketCointable'
import MarketOverview from '@/Components/markets/MarketOverview'
import React from 'react'

export default function Markets() {
  return (
    <React.Fragment>
    <Header/>
    <MarketOverview/>
    <MarketCointable/>
    <Chart_section/> 
    <Footer/>
    </React.Fragment>
  )
}
