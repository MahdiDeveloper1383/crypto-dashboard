'use client'
import Footer from '@/Components/layout/Footer'
import Header from '@/Components/layout/Header'
import { INews } from '@/Interfaces/crypto/news'
import UseNews from '@/react-query/UseNews'
import React, { useEffect, useState } from 'react'

export default function News_details({params}:{params:Promise<{id:string}>}) {
    const {id} = React.use(params)
    const {data:news} = UseNews()
    const [News,setnews] = useState<INews>()
    useEffect(()=>{
        const selectedNews = news?.find((n)=>n.article_id.toString()=== id)
        setnews(selectedNews)
    },[news])
  return (
    <React.Fragment>
   <Header/>
   <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{News?.title}</h1>
        <p className="text-gray-500 text-sm">
          {News?.pubDate} | {News?.source_name}
        </p>
      </div>
      {News?.image_url && (
        <img
          src={News.image_url}
          alt={News?.title}
          className="w-full max-h-96 object-cover rounded-lg"
        />
      )}

      <div className="prose prose-lg">
        <p>{News?.content}</p>
      </div>
      <div className="flex gap-4 mt-6">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Share
        </button>
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Bookmark
        </button>
      </div>
      
    </div>
  
   <Footer/>
    </React.Fragment>
  )
}
