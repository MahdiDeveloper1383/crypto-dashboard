import { useUser } from '@/Hooks/UseUser'
import React from 'react'

export default function Portfolio() {
  const { user } = useUser()
  return (
    <div className='flex flex-col space-y-6 w-full rounded-2xl bg-white min-h-screen shadow-2xl shadow-gray-100'>
      <div className='rounded-2xl border flex flex-col gap-2 border-gray-200 p-6 sm:p-8'>
        <div className='flex justify-between items-center'>
          <div>
            <h3 className='text-3xl font-bold'>Portfolio</h3>
            <span className='text-sm text-gray-400'>Track your crypto investments</span>
          </div>
        <span className="rounded-xl border bg-green-600 px-3 py-2 text-sm font-medium text-white">
          Live marke
          </span>        
          </div>
          <div>
          <h4 className='text-xl font-bold'>Total Portfolio Value</h4>
          <p>{user?.usdBalance}</p>
          
          </div>
      </div>
    </div>
  )
}

