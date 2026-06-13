'use client'
import Google from '@/Components/GooleAuth/Google'
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation';
type Signupform={
  firstname:string,
  lastname:string,
  username:string,
  email:string,
  password:string,
  repassword:string
}
export default function page() {
  const router = useRouter()
  const [isloading,setIsloading] = useState(false)
  const schema = yup.object({
    firstname:yup.string().required('firstname is required'),
    lastname:yup.string().required('lastname is required'),
    username:yup.string().min(3,"Username's character is must be more than 2").max(12,"Username's character is must be less than 13").required('username is required'),
    email:yup.string().email('Invalid email').required('Email is requierd'),
    password:yup.string().min(8,'Password must be at least 8 characters').matches(/[a-z]/,'Password must have a lowercase letter').matches(/[A-Z]/,'Password must have an uppercase letter').matches(/[0-9]/,'Password must have a number').matches(/[!@#$%^&*]/,'Password must have a special character').required(),
    repassword:yup.string().oneOf([yup.ref('password')]).required()
  })
  const {register,handleSubmit} = useForm({resolver:yupResolver(schema)})
  async function onsubmit(data:Signupform){
    if (isloading) return;
    try{
        setIsloading(true)
      const res = await fetch('/api/users/signup',{
      method:'POST',
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify(data)
    })
    if (res.ok) {
      router.push('/')
    }
  }finally{
    setIsloading(false)
}
}
  return (
    <React.Fragment>
        <h2 className="text-6xl font-mono text-shadow-xs text-shadow-black ">
        Sign Up
      </h2>
      <form onSubmit={handleSubmit(onsubmit)} className='flex flex-col w-full max-w-[450px] gap-8'>
         <input
          type="text"
          {...register('firstname',{required:true})}
          placeholder="First Name:Dani"
          className=" w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-400 shadow-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
        />
         <input
          type="text"
         {...register('lastname',{required:true})}
          placeholder="Last name:Soprano"
          className=" w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-400 shadow-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
        />
        <input
          type="text"
          {...register('username',{required:true})}
          placeholder="Username:Dani21"
          className=" w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-400 shadow-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
        />
        <input
          type="email"
          {...register('email',{required:true})}
          placeholder="Email:example@email.com"
          className=" w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-400 shadow-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
        />
        <input
          type="password"
          {...register('password',{required:true})}
          placeholder="Password:123456789Aa@"
          className=" w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-400 shadow-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
        />
        <input
          type="password"
          {...register('repassword',{required:true})}
          placeholder="Comfrim Password"
          className=" w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-400 shadow-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
        />
        <input
          type="submit"
          disabled={isloading}
          value={isloading?"Crating Account...":"Sign Up"}
          className="bg-blue-400 p-4 cursor-pointer rounded-2xl shadow-2xs shadow-gray-500 hover:shadow-xl transition text-2xl font-sans"
        />
      </form>
      <span className='text-4xl font-bold'>OR</span>
      <Google/>
    </React.Fragment>
  )
}
