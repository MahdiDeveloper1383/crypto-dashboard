"use client";
import News_Card from "@/Components/Cards/News_Card";
import Footer from "@/Components/layout/Footer";
import Header from "@/Components/layout/Header";
import UseNews from "@/react-query/UseNews";
import React, { useState } from "react";

export default function News() {
  const { data: News } = UseNews();
  const TopNews = News?.slice(0, 4);
  const [filter,setfilter] = useState({
    search:'',
    keywords:''
  })
  const filteredNews = News?.filter((n)=>n.title.toLowerCase().includes(filter.search.toLowerCase())&&
  (n.keywords.includes(filter.keywords.toLocaleLowerCase())))
  return (
    <React.Fragment>
      <Header />
      <div className="mt-12 w-full sm:max-w-[1500px] min-w-[600px] ml-[30px]  sm:mx-auto flex flex-col items-center justify-center gap-8 min-h-[300px] shadow-2xl rounded-2xl px-4">
        <h4 className="mt-5 text-4xl sm:text-5xl font-bold text-center">
          Top News
        </h4>

        <div className="w-full p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {TopNews?.map((n) => (
            <News_Card News={n} key={n.article_id} />
          ))}
        </div>
      </div>

      <div className="min-w-[320px] sm:min-w-[648px] w-full h-screen mx-auto flex flex-col mt-8 rounded-2xl shadow-md p-5 bg-white dark:bg-gray-900">
        <h4 className="text-4xl sm:text-6xl font-bold text-center text-gray-900 dark:text-white mb-6">
          News
        </h4>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <select value={filter.keywords} onChange={(e)=>setfilter({...filter,keywords:e.target.value})} className="p-2 px-4 border rounded-full w-full sm:w-auto">
            <option value="all">All</option>
            <option value="crypto">Crypto</option>
            <option value="market">Market</option>
            <option value="bitcoin">Bitcoin</option>
            <option value="ethereum">Ethereum</option>
          </select>

          <input
            type="text"
            placeholder="Search news..."
            className="p-2 px-4 border rounded-full w-full sm:w-64"
            value={filter.search}
            onChange={(e)=>setfilter({...filter,search:e.target.value})}
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredNews?.map((n) => (
              <News_Card News={n} key={n.article_id} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
}
