import Google from '@/Components/GooleAuth/Google'
import React from 'react'

export default function page() {
  return (
    <React.Fragment>
        <h2 className="text-6xl font-mono text-shadow-xs text-shadow-black ">
        Sign Up
      </h2>
      <form action="" className='flex flex-col w-full max-w-[450px] gap-8'>
         <input
          type="text"
          placeholder="First Name:Dani"
          className=" w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-400 shadow-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
        />
         <input
          type="text"
          placeholder="Last name:Soprano"
          className=" w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-400 shadow-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
        />
        <input
          type="text"
          placeholder="Username:Dani21"
          className=" w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-400 shadow-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
        />
        <input
          type="text"
          placeholder="Email:example@email.com"
          className=" w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-400 shadow-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
        />
        <input
          type="password"
          placeholder="Password:123456789Aa@"
          className=" w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-400 shadow-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
        />
        <input
          type="password"
          placeholder="Comfrim Password"
          className=" w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-400 shadow-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
        />
        <input
          type="submit"
          value={"Sign Up"}
          className="bg-blue-400 p-4 cursor-pointer rounded-2xl shadow-2xs shadow-gray-500 hover:shadow-xl transition text-2xl font-sans"
        />
      </form>
      <span className='text-4xl font-bold'>OR</span>
      <Google/>
    </React.Fragment>
  )
}
