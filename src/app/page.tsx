'use client'
import React from "react";

import Header from "@/Components/Header";
import GlobalMarketTable from "@/Components/overviewtable";
import TopCoins from "@/Components/TopCoins";
import Chart_section from "@/Components/Chart_section";
import TopTrends from "@/Components/TopTrends";
import UseNews from "@/Hooks/react-query/UseNews";
import News_Card from "@/Components/News_Card";
import Footer from "@/Components/Footer";

export default function Home() {
  const {data} = UseNews()
  const News = data?.slice(0,7)
  return (
    <React.Fragment>
      <Header/>
      <GlobalMarketTable/>
      <TopCoins/>
      <Chart_section/>
      <TopTrends/>
      <div className="flex flex-col gap-12 mt-28">
        <h4 className="text-center text-6xl font-bold text-gray-600 text-shadow-2xs shadow-white">News</h4>
      <div className="grid grid-cols-4 gap-3 p-5">
        {News?.map((n)=>(
          <News_Card key={n.article_id} News={n}/>
        ))}
        <a className="text-4xl cursor-pointer font-serif text-gray-700">
        Cilck for more News...
      </a>
      </div>
    
      </div>
      <Footer/>
    </React.Fragment>
  );
}
