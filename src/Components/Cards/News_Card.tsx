import Image from 'next/image'
import React from 'react'
import { INews } from '@/Interfaces/crypto/news'

export default function News_Card({ News }: { News: INews }) {
  return (
    <div className="
      flex flex-col items-center justify-start 
      w-full sm:w-[320px] min-h-[520px] 
      bg-white dark:bg-gray-900 
      rounded-2xl shadow-xl hover:shadow-2xl 
      hover:scale-[1.02] transition-all duration-300 
      overflow-hidden cursor-pointer
    ">
      <div className="w-full h-[200px] relative">
        <Image
          alt={News.title || 'news'}
          src={News.image_url || '/assets/news-2444778_960_720.webp'}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col flex-1 p-5 text-center">
        <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 line-clamp-2 mb-2">
          {News.title}
        </h4>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-4 leading-relaxed">
          {News.description || 'No description available.'}
        </p>

        <div className="mt-auto pt-4">
          <a
            target="_blank"
            className="inline-block text-green-600 dark:text-green-400 font-semibold hover:underline"
          >
            Read more →
          </a>
        </div>
      </div>
    </div>
  )
}
