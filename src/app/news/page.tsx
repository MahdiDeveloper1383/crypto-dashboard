'use client'
import News_Card from '@/Components/Cards/News_Card'
import Footer from '@/Components/layout/Footer'
import Header from '@/Components/layout/Header'
import UseNews from '@/react-query/UseNews'
import React from 'react'

export default function News() {
  const {data:News} = UseNews()
  const TopNews = News?.slice(0,4)
  return (
    <React.Fragment>
        <Header/>
        <div className='mt-12 min-w-[648px] w-full gap-8 flex flex-col min-h-[300px] shadow-2xl rounded-2xl '>
          <h4 className=' mt-5 text-5xl font-bold text-center'>Top News</h4>
          <div className='w-full p-5 grid-cols-2 grid lg:grid-cols-4 md:grid-cols-2 gap-12'>
            {
              TopNews?.map((n)=>(
                <News_Card News={n} key={n.article_id}/>
              ))
            }
          </div>
        </div>
        <Footer/>
    </React.Fragment>
  )
}
