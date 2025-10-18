import React from 'react'
import Footer from '@/Components/layout/Footer'
import Header from '@/Components/layout/Header'
import CoinsSummury from '@/Components/coins/CoinsSummury'

export default function Coins() {
  return (
    <React.Fragment>
    <Header/>
    <CoinsSummury/>
    <Footer/>
    </React.Fragment>
  )
}
