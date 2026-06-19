'use client'
import Google from "@/Components/GooleAuth/Google";
import { useUser } from "@/Hooks/UseUser";
import {  useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type LoginForm = {
  identifier: string;
  password: string;
};
export default function page() {
  const {setUser} = useUser()
  const [error,setError] = useState<string>()
  const router = useRouter()
  const {register,handleSubmit} = useForm<LoginForm>()
  async function onsubmit(data:LoginForm) {
    
    const res = await fetch('/api/users/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const result = await res.json()
    if (res.ok) {
      setUser(result.user)
      router.push('/')

    }else{
      setError('Email-Username or password is inavalid')
    }
  }
  return (
    <React.Fragment>
      <h2 className="text-6xl font-mono text-shadow-xs text-shadow-black ">
        Login
      </h2>
      <form className="flex flex-col w-full max-w-[450px] gap-8" onSubmit={handleSubmit(onsubmit)}>
        <input
          type="text"
          {...register("identifier")}
          placeholder="Enter Username or Email"
          className=" w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-400 shadow-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
        />
        <input
          type="password"
          {...register("password")}
          className=" w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-400 shadow-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
          placeholder="Enter the Password"
        />
        <input
          type="submit"
          value={"Login"}
          className="bg-blue-400 p-4 cursor-pointer rounded-2xl shadow-2xs shadow-gray-500 hover:shadow-xl transition text-2xl font-sans"
        />
       {error && <span className="text-2xl text-red-600">{error}</span>}
      </form>
      <span className="text-4xl font-bold">
        OR
      </span>
       <Google/>
    </React.Fragment>
  );
}
