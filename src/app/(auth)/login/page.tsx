import Google from "@/Components/GooleAuth/Google";
import React from "react";

export default function page() {
  return (
    <React.Fragment>
      <h2 className="text-6xl font-mono text-shadow-xs text-shadow-black ">
        Login
      </h2>
      <form className="flex flex-col w-full max-w-[450px] gap-8">
        <input
          type="text"
          placeholder="Enter Username or Email"
          className=" w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-400 shadow-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
        />
        <input
          type="password"
          className=" w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-400 shadow-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
          placeholder="Enter the Password"
        />
        <input
          type="submit"
          value={"Login"}
          className="bg-blue-400 p-4 cursor-pointer rounded-2xl shadow-2xs shadow-gray-500 hover:shadow-xl transition text-2xl font-sans"
        />
       
      </form>
      <span className="text-4xl font-bold">
        OR
      </span>
       <Google/>
    </React.Fragment>
  );
}
