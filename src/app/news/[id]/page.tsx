'use client'
import Footer from '@/Components/layout/Footer'
import Header from '@/Components/layout/Header'
import { INews } from '@/Interfaces/crypto/news'
import UseNews from '@/react-query/UseNews'
import Image from 'next/image'
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
   <Image src={News?.image_url|| ''} alt='News_img' width={500} height={300}/>
   <Footer/>
    </React.Fragment>
  )
}
