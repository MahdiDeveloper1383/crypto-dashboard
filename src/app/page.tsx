'use client'
import React from "react";
import Header from "./_Components/Header";
import GlobalMarketTable from "./_Components/overviewtable";
import TopCoins from "./_Components/TopCoins";
import Chart_section from "./_Components/Chart_section";
import TopTrends from "./_Components/TopTrends";
import UseNews from "./_Hooks/react-query/UseNews";
import News_Card from "./_Components/News_Card";
import Footer from "./_Components/footer";

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
      <div className="grid grid-cols-4 gap-3">
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
