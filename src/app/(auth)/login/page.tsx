import React from "react";

export default function page() {
  return (
    <React.Fragment>
      <h2 className="text-6xl font-mono text-shadow-xs text-shadow-black ">
        Login
      </h2>
      <form className="flex flex-col w-full max-w-[450px] gap-10">
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
        <button className="flex items-center justify-center gap-3 w-full max-w-md bg-white border border-gray-300 rounded-xl px-6 py-4 text-gray-700 font-medium text-lg shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="w-6 h-6"
          >
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.7 15 19 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.2C29.3 35.1 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8H6.2C9.5 39.5 16 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-3.4 5.6-6.8 7.1l6.2 5.2C38.6 36.7 44 31.1 44 24c0-1.3-.1-2.7-.4-3.5z"
            />
          </svg>

          <span>Continue with Google</span>
        </button>
      </form>
    </React.Fragment>
  );
}
